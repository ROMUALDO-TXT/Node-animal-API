import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTutorNotificationTable1641488727251
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'tutorsNotifications',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'read',
            type: 'boolean',
          },
          {
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'tutorId',
            type: 'uuid',
          },
          {
            name: 'ongPicture',
            type: 'varchar',
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
        'tutorsNotifications',
        new TableForeignKey({
          columnNames: ['tutorId'],
          referencedTableName: 'tutors',
          referencedColumnNames: ['id'],
        }),
      );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tutorsNotifications');
  }
}
