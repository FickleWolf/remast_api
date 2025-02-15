import { CreateUserDto } from "@v1/users/presentation/dtos/requests/create-user.dto";
import { UpdateUserDto } from "@v1/users/presentation/dtos/requests/update-user.dto";
import { UserResponseDto } from "@v1/users/presentation/dtos/responses/user-response.dto";

export interface UserServiceInterface {
  createUser(
    requesterId: string,
    body: CreateUserDto,
  ): Promise<UserResponseDto>;
  getAllUsers(requesterId: string): Promise<UserResponseDto[]>;
  getUserById(userId: string): Promise<UserResponseDto>;
  updateUser(
    requesterId: string,
    userId: string,
    body: UpdateUserDto,
  ): Promise<UserResponseDto>;
}
