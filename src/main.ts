import "dotenv/config";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AllExceptionsFilter } from "@common/exceptions/all-exceptions.filter";
import { AuthGuard } from "@common/guards/auth.guard";
import { FirebaseService } from "@common/providers/firebase.service";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const firebaseService = app.get(FirebaseService);
  app.useGlobalGuards(new AuthGuard(firebaseService));

  await app.listen(3000);
}
bootstrap();
