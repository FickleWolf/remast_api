import { UserEntity } from "src/v1/users/domain/entities/user.entity";

export interface UserRepositoryInterface {
  save(user: UserEntity): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findById(userId: string): Promise<UserEntity | null>;
}
