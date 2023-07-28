import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { UserDTO } from "src/user/user.dto";

@Injectable()
export class UserMapper {
	toDTOs(users: User[]): UserDTO[] {
		const userDTOs: UserDTO[] = [];
		for (let i = 0; i < users.length; ++i) {
			userDTOs.push(this.toDTO(users[i]));
		}

		return userDTOs;
	}

	toDTO(user: User): UserDTO {
		return {
			id: user.id,
			firstName: user.firstName,
		};
	}
}
