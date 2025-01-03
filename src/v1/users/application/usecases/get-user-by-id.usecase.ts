import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "src/v1/users/domain/entities/user.entity";
import { GetUserByIdDto } from "../../presentation/dtos/requests/get-user-by-id.dto";
import { UserRepositoryInterface } from "../interfaces/user-repository.interface";

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject("UserRepositoryInterface")
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(query: GetUserByIdDto): Promise<UserEntity> {
    const { userId } = query;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    return user;
  }
}
