import { IsNotEmpty } from "class-validator";

export class GetUserByIdDto {
  @IsNotEmpty()
  userId: string;
}
