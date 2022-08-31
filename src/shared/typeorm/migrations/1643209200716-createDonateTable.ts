import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createDonateTable1643209200716 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'donations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'donationDate',
            type: 'timestamp',
          },
          {
            name: 'amount',
            type: 'decimal(10,2)',
          },
          {
            name: 'tutorId',
            type: 'uuid',
          },
          {
            name: 'campaignId',
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
    );
    await queryRunner.createForeignKey(
      'donations',
      new TableForeignKey({
        columnNames: ['tutorId'],
        referencedTableName: 'tutors',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'donations',
      new TableForeignKey({
        columnNames: ['campaignId'],
        referencedTableName: 'campaigns',
        referencedColumnNames: ['id'],
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('donations');
  }
}
