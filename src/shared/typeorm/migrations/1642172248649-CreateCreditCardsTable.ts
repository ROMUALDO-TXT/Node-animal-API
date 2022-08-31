import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCreditCardsTable1642172248649 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'creditCards',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'creditCardId',
            type: 'varchar',
          },
          {
            name: 'last4CardNumber',
            type: 'varchar',
          },
          {
            name: 'expirationMonth',
            type: 'varchar',
          },
          {
            name: 'expirationYear',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'brand',
            type: 'varchar',
          },
          {
            name: 'tutorId',
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
        'creditCards',
        new TableForeignKey({
          columnNames: ['tutorId'],
          referencedTableName: 'tutors',
          referencedColumnNames: ['id'],
        }),
      );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('creditCards');
  }
}
