import { UserRoles, UserRole } from "@common/types/user.type";
import { IsOptional, IsString, IsUrl, IsIn } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @IsUrl({ protocols: ["http", "https"], require_protocol: true })
  iconUrl: string;

  @IsOptional()
  @IsIn(UserRoles)
  role: UserRole;

  @IsOptional()
  @IsString()
  shopAccount: string;
}
