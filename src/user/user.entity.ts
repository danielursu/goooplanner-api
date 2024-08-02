import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		length: 100,
		name: "first_name",
		nullable: false,
	})
	firstName: string;

	@Column({
		type: "varchar",
		length: 100,
		name: "last_name",
		nullable: false,
	})
	lastName: string;

	@Column({
		type: "varchar",
		length: 255,
		name: "email",
		unique: true,
		nullable: false,
	})
	email: string;

	@Column({
		type: "varchar",
		length: 255,
		name: "password",
		nullable: false,
	})
	password: string;
}
