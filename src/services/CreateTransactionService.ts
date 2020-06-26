// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import CreateCategoryService from './CreateCategoryService';
import { getRepository, getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: "income" | "outcome";
  category_title: string;
}

class CreateTransactionService {
  
  public async execute({title, value, type, category_title}: Request): Promise<Transaction> {
    
    const createCategoryService = new CreateCategoryService();

    const categoryLocated = await createCategoryService.execute({title: category_title});

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const balance = await transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value)
      throw new AppError('Insuficient funds');

    const newTransaction = transactionsRepository.create({ title, value, type, category_id: categoryLocated.id });

    const createdTransaction = transactionsRepository.save(newTransaction);

    return createdTransaction;
  
  }

}

export default CreateTransactionService;
