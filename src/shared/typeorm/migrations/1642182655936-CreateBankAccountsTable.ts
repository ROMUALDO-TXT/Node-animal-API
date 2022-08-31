import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBankAccountsTable1642182655936
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'bankAccounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'document',
            type: 'varchar',
          },
          {
            name: 'documentType',
            type: 'varchar',
          },
          {
            name: 'bankNumber',
            type: 'integer',
          },
          {
            name: 'accountNumber',
            type: 'integer',
          },
          {
            name: 'agencyNumber',
            type: 'integer',
          },
          {
            name: 'accountType',
            type: 'varchar',
          },
          {
            name: 'ongId',
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
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    ),
      await queryRunner.createForeignKey(
        'bankAccounts',
        new TableForeignKey({
          columnNames: ['ongId'],
          referencedTableName: 'ongs',
          referencedColumnNames: ['id'],
        }),
      );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bankAccounts');
  }
}
