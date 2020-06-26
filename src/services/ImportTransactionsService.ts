import Transaction from '../models/Transaction';
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs';
import csvParse from 'csv-parse';
import { getRepository, getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateCategoryService from './CreateCategoryService';
import CreateTransactionService from './CreateTransactionService';
import parse from 'csv-parse';

interface Request {
  file: Express.Multer.File
}

interface RowStruct {
  title: string,
  type: 'income' | 'outcome',
  value: number,
  category: string
}

class ImportTransactionsService {
  public async execute(request: Request): Promise<Transaction[]> {
    
    const pathFilename = request.file.path;

    const lines : RowStruct[] = [];
    const transactions : Transaction[] = [];

    const createTransactionService = new CreateTransactionService();

    const readStream = fs.createReadStream(pathFilename);

    const parseStream = csvParse(
          {
            columns: [
              {name: 'title'},
              {name: 'type'},
              {name: 'value'},
              {name: 'category'}
            ],
            auto_parse: true,
            trim: true,
            from_line: 2  
          }
        );

    const parseCsv = readStream.pipe(parseStream);

    parseCsv.on('data', async (dataRow) => {
        lines.push(dataRow);
      });
    
    await new Promise( resolve => {
      parseCsv.on('end', resolve);
    });

    for (let index = 0; index < lines.length; index++) {
      const {title, type, value, category} = lines[index];

      const createdTransaction = await createTransactionService.execute(
        {title, type, value, category_title: category}
      );
      
      transactions.push(createdTransaction);
    }

    return transactions;
  }
}

export default ImportTransactionsService;
