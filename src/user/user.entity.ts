import { Column, Entity, Unique, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Unique(["email"])
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("text", { name: "first_name" })
	firstName: string;

	@Column("text", { name: "last_name" })
	lastName: string;

	@Column("text", { name: "email" })
	email: string;

	@Column("text", { name: "password" })
	password: string;
}
