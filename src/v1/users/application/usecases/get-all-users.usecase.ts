import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserEntity } from "@v1/users/domain/entities/user.entity";
import { UserRepositoryInterface } from "../interfaces/user-repository.interface";

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject("UserRepositoryInterface")
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(requesterId: string): Promise<UserEntity[]> {
    const requester = await this.userRepository.findById(requesterId);
    if (!requester) {
      throw new NotFoundException(
        `Requester with ID ${requesterId} not found.`,
      );
    }
    if (!requester.isAdmin()) {
      throw new UnauthorizedException(
        `User with ID ${requesterId} does not have permission to view all users.`,
      );
    }
    return this.userRepository.findAll();
  }
}
