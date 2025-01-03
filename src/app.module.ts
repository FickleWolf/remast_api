import { Module } from "@nestjs/common";
import { V1Module } from "./v1/v1.module";
import { FirebaseModule } from "./common/providers/firebase.module";

@Module({
  imports: [V1Module, FirebaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
