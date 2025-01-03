import { Injectable } from "@nestjs/common";
import { UserEntity } from "../../domain/entities/user.entity";
import { CreateUserDto } from "../../presentation/dtos/requests/create-user.dto";
import { GetUserByIdDto } from "../../presentation/dtos/requests/get-user-by-id.dto";
import { UserResponseDto } from "../../presentation/dtos/responses/user-response.dto";
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
    return this.toResponseDto(user, true);
  }

  async getAllUsers(requesterId: string): Promise<UserResponseDto[]> {
    const users = await this.getAllUsersUseCase.execute(requesterId);
    return users.map((user) => this.toResponseDto(user, true));
  }

  async getUserById(
    requesterId: string,
    query: GetUserByIdDto,
  ): Promise<UserResponseDto> {
    const user = await this.getUserByIdUseCase.execute(query);

    const includePrivate = requesterId === query.userId;
    return this.toResponseDto(user, includePrivate);
  }

  private toResponseDto(
    userEntity: UserEntity,
    includePrivate: boolean,
  ): UserResponseDto {
    return new UserResponseDto(
      userEntity.id,
      userEntity.userName,
      userEntity.iconUrl,
      userEntity.role,
      userEntity.createdAt,
      userEntity.shopAccount,
      includePrivate && userEntity.privateData,
    );
  }
}
