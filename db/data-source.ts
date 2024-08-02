import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "victor0110",
	database: "goooplanner",
	entities: ["dist/**/*.entity{.ts,.js}"],
	migrations: ["dist/db/migrations/*.js"],

	// synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
