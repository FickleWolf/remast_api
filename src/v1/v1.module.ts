import { Module } from "@nestjs/common";
import { UserModule } from "./users/user.module";

@Module({
  imports: [UserModule],
})
export class V1Module {}