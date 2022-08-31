import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createPatronizeTable1642690424860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'patronizes',
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
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'conclusion_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'planName',
            type: 'varchar',
          },
          {
            name: 'planAmount',
            type: 'decimal(10,2)',
          },
          {
            name: 'planId',
            type: 'varchar',
          },
          {
            name: 'signatureId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tutorId',
            type: 'uuid',
          },
          {
            name: 'animalId',
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
      'patronizes',
      new TableForeignKey({
        columnNames: ['tutorId'],
        referencedTableName: 'tutors',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'patronizes',
      new TableForeignKey({
        columnNames: ['animalId'],
        referencedTableName: 'animals',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'patronizes',
      new TableForeignKey({
        columnNames: ['signatureId'],
        referencedTableName: 'signatures',
        referencedColumnNames: ['id'],
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patronizes');
  }
}
