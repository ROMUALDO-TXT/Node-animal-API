import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class createAccountForeignKey1643209108729
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'campaigns',
      new TableForeignKey({
        columnNames: ['accountId'],
        referencedTableName: 'bankAccounts',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('campaigns', 'accountId');
  }
}
