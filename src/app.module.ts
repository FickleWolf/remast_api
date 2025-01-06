import { FirebaseModule } from "@common/providers/firebase.module";
import { Module } from "@nestjs/common";
import { V1Module } from "@v1/v1.module";

@Module({
  imports: [V1Module, FirebaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
