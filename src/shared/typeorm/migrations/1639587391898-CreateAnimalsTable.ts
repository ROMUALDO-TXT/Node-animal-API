import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAnimalsTable1639587391898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'animals',
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
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'sex',
            type: 'varchar',
          },
          {
            name: 'size',
            type: 'varchar',
          },
          {
            name: 'species',
            type: 'varchar',
          },
          {
            name: 'bornDate',
            type: 'timestamp',
          },
          {
            name: 'shelterEnterDate',
            type: 'timestamp',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'costsDescription',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'monthlyCosts',
            type: 'decimal(10,2)',
            isNullable: true,
          },
          {
            name: 'isAvailable',
            type: 'boolean',
            default: false,
          },
          {
            name: 'adoptionDate',
            type: 'timestamp',
            isNullable: true,
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
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'animals',
      new TableForeignKey({
        columnNames: ['ongId'],
        referencedTableName: 'ongs',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('animals');
  }
}
