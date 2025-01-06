import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "@v1/users/domain/entities/user.entity";
import { UserRepositoryInterface } from "../interfaces/user-repository.interface";

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject("UserRepositoryInterface")
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    return user;
  }
}
