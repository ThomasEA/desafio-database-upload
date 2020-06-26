import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTransactions1593131396552 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'value',
                        type: 'decimal'
                    },
                    {
                        name: 'type',
                        type: 'varchar'
                    },
                    {
                        name: 'category_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    new TableForeignKey({
                        name: 'fk_transactions_categories_category_id',
                        columnNames: ['category_id'],
                        referencedTableName: 'categories',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    }),
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('transactions');
    }

}
