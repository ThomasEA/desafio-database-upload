import { Router } from 'express';

import Multer from 'multer';
import CreateTransactionService from '../services/CreateTransactionService';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import DeleteTransactionService from '../services/DeleteTransactionService';
import uploadConfig from '../config/upload';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

const upload = Multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepository.find({ relations: ["category"]});

  const sanitizedTransactions = transactions.map( transaction => {
    delete transaction.category_id;
    return transaction;
  });

  const balance = await transactionsRepository.getBalance();

  return response.status(200).json({
    transactions: sanitizedTransactions,
    balance
  });
});

transactionsRouter.post('/', async (request, response) => {
  const {title, value, type, category: category_title} = request.body;

  const createTransactionService = new CreateTransactionService();
  
  const createdTransaction = await createTransactionService.execute({title, value, type, category_title});

  return response.status(200).json(createdTransaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const {id} = request.params;

  const deleteTransactionService = new DeleteTransactionService();

  await deleteTransactionService.execute({transaction_id: id});

  return response.status(200).send();

});

transactionsRouter.post('/import', upload.single('file'), async (request, response) => {
  const {file} = request;

  const importTransactionsService = new ImportTransactionsService();

  const importedTransactions = await importTransactionsService.execute({file});

  return response.status(200).json(importedTransactions);
});

export default transactionsRouter;
