import { Module } from "@nestjs/common";
import { UserService } from "./application/services/user.service";
import { CreateUserUseCase } from "./application/usecases/create-user.usecase";
import { GetAllUsersUseCase } from "./application/usecases/get-all-users.usecase";
import { GetUserByIdUseCase } from "./application/usecases/get-user-by-id.usecase";
import { UserRepository } from "./infrastructure/repositories/user.repository";
import { UserController } from "./presentation/controllers/user.controller";
import { UpdateUserUseCase } from "./application/usecases/update-user.usecase";

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: "UserRepositoryInterface",
      useClass: UserRepository,
    },
    {
      provide: "UserServiceInterface",
      useClass: UserService,
    },
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
  ],
})
export class UserModule {}
