import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateAddressfk1641230821441 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['addressId'],
        referencedTableName: 'address',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'addressId');
  }
}
