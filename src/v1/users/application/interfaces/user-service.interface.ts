import { CreateUserDto } from "../../presentation/dtos/requests/create-user.dto";
import { GetUserByIdDto } from "../../presentation/dtos/requests/get-user-by-id.dto";
import { UserResponseDto } from "../../presentation/dtos/responses/user-response.dto";

export interface UserServiceInterface {
  createUser(
    requesterId: string,
    body: CreateUserDto,
  ): Promise<UserResponseDto>;
  getAllUsers(requesterId: string): Promise<UserResponseDto[]>;
  getUserById(
    requesterId: string,
    query: GetUserByIdDto,
  ): Promise<UserResponseDto>;
}
