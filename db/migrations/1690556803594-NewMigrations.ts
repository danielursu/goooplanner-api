import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1690556803594 implements MigrationInterface {
	name = "NewMigrations1690556803594";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
		await queryRunner.query(`ALTER TABLE "user" ADD "first_name" text NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
		await queryRunner.query(`ALTER TABLE "user" ADD "first_name" character varying(255)`);
	}
}
