import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createSignatureTable1642690228763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'signatures',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'startsOn',
            type: 'timestamp',
          },
          {
            name: 'createdOn',
            type: 'timestamp',
          },
          {
            name: 'nextBillingDate',
            type: 'timestamp',
          },
          {
            name: 'dueDay',
            type: 'varchar',
          },
          {
            name: 'accessLink',
            type: 'varchar',
            isNullable: true,
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
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('signatures');
  }
}
