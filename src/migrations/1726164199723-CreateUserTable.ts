import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1726164199723 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "user",
				columns: [
					{
						name: "id",
						type: "int",
						isPrimary: true,
						isGenerated: true,
						generationStrategy: "increment",
					},
					{
						name: "first_name",
						type: "varchar",
						length: "100",
						isNullable: false,
					},
					{
						name: "last_name",
						type: "varchar",
						length: "100",
						isNullable: false,
					},
					{
						name: "email",
						type: "varchar",
						length: "255",
						isUnique: true,
						isNullable: false,
					},
					{
						name: "password",
						type: "varchar",
						length: "255",
						isNullable: false,
					},
				],
			}),
			true,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("user");
	}
}
