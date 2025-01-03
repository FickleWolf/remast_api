import { IsNotEmpty, IsOptional, IsIn } from "class-validator";
import { UserRole, UserRoles } from "src/common/types/user.type";

export class CreateUserDto {
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsIn(UserRoles)
  role: UserRole | undefined;
}
