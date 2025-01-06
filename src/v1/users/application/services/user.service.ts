import { Injectable } from "@nestjs/common";
import { UserEntity } from "@v1/users/domain/entities/user.entity";
import { CreateUserDto } from "@v1/users/presentation/dtos/requests/create-user.dto";
import { UserResponseDto } from "@v1/users/presentation/dtos/responses/user-response.dto";
import { UserServiceInterface } from "../interfaces/user-service.interface";
import { CreateUserUseCase } from "../usecases/create-user.usecase";
import { GetAllUsersUseCase } from "../usecases/get-all-users.usecase";
import { GetUserByIdUseCase } from "../usecases/get-user-by-id.usecase";

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async createUser(
    requesterId: string,
    body: CreateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.createUserUseCase.execute(requesterId, body);
    return this.toResponseDto(user);
  }

  async getAllUsers(requesterId: string): Promise<UserResponseDto[]> {
    const users = await this.getAllUsersUseCase.execute(requesterId);
    return users.map((user) => this.toResponseDto(user));
  }

  async getUserById(userId: string): Promise<UserResponseDto> {
    const user = await this.getUserByIdUseCase.execute(userId);

    return this.toResponseDto(user);
  }

  private toResponseDto(userEntity: UserEntity): UserResponseDto {
    return new UserResponseDto(
      userEntity.id,
      userEntity.userName,
      userEntity.iconUrl,
      userEntity.role,
      userEntity.createdAt,
      userEntity.shopAccount,
    );
  }
}
