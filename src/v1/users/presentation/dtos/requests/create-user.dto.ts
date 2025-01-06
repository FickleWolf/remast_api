import { UserRoles, UserRole } from "@common/types/user.type";
import { IsNotEmpty, IsString, IsOptional, IsIn } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsIn(UserRoles)
  role: UserRole;
}
