import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateServer1595941150569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'servers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          // ===============================
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'port',
            type: 'integer',
            isUnique: true,
          },
          {
            name: 'directory',
            type: 'varchar',
          },
          {
            name: 'autostart',
            type: 'boolean',
            default: true,
          },
          {
            name: 'crashrestart',
            type: 'boolean',
            default: true,
          },
          // ===============================
          {
            name: 'maxplayers',
            type: 'integer',
            default: 100,
          },
          {
            name: 'memory',
            type: 'integer',
            default: 2048,
          },
          {
            name: 'jarfile',
            type: 'varchar',
            default: "'spigot.jar'",
          },
          // ===============================
          {
            name: 'lastpid',
            type: 'integer',
            default: -1,
          },
          // ===============================
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('servers');
  }
}
