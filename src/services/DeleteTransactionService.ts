import AppError from '../errors/AppError';
import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  transaction_id: string;
}

class DeleteTransactionService {
  public async execute({transaction_id}: Request): Promise<void> {
    
    const transactionRespository = getRepository(Transaction);

    const transaction = await transactionRespository.findOne(transaction_id);

    if (!transaction) {
      throw new AppError('Transaction not found');
    }

    await transactionRespository.delete({id: transaction_id});
  }
}

export default DeleteTransactionService;
