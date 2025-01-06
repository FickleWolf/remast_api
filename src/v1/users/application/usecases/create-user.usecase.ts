import {
  Inject,
  Injectable,
  ConflictException,
  ForbiddenException,
} from "@nestjs/common";
import { UserEntity } from "@v1/users/domain/entities/user.entity";
import { CreateUserDto } from "@v1/users/presentation/dtos/requests/create-user.dto";
import { UserRepositoryInterface } from "../interfaces/user-repository.interface";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject("UserRepositoryInterface")
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(requesterId: string, body: CreateUserDto): Promise<UserEntity> {
    const { userId, role } = body;
    const assignedRole = role ?? "general";

    const existingUser = await this.userRepository.findById(userId);
    if (existingUser) {
      throw new ConflictException(`User with ID ${userId} already exists.`);
    }

    if (assignedRole === "admin") {
      const requester = await this.userRepository.findById(requesterId);
      if (!requester || !requester.isAdmin()) {
        throw new ForbiddenException(
          `User with ID ${requesterId} does not have permission to create an admin user.`,
        );
      }
    }

    const newUser = new UserEntity(
      userId,
      "",
      "",
      assignedRole,
      Math.floor(Date.now() / 1000),
    );

    return this.userRepository.save(newUser);
  }
}
