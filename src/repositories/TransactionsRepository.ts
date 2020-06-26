import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const income: number = transactions.reduce( (value: number, current) => value + +(current.type === 'income' ? current.value : 0), 0 );
    const outcome: number = transactions.reduce( (value: number, current) => value + +(current.type === 'outcome' ? current.value : 0), 0 );
    const total: number = income - outcome;

    return {
      income,
      outcome,
      total
    }
  }
}

export default TransactionsRepository;
