import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepositoryInterface } from "../interfaces/user-repository.interface";
import { UserEntity } from "@v1/users/domain/entities/user.entity";
import { UpdateUserDto } from "@v1/users/presentation/dtos/requests/update-user.dto";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject("UserRepositoryInterface")
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(
    requesterId: string,
    userId: string,
    body: UpdateUserDto,
  ): Promise<UserEntity> {
    const requester = await this.userRepository.findById(requesterId);
    if (!requester) {
      throw new NotFoundException(
        `Requester with ID ${requesterId} not found.`,
      );
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    if (body.userName) user.updateUserName(body.userName);

    if (body.iconUrl) user.updateIconUrl(body.iconUrl);

    if (body.role) user.updateRole(body.role, requester.isAdmin());

    if (body.shopAccount)
      user.updateShopAccount(body.shopAccount, requester.isAdmin());

    return await this.userRepository.save(user);
  }
}
