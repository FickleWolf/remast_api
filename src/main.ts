import "dotenv/config";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/exceptions/all-exceptions.filter";
import { FirebaseService } from "./common/providers/firebase.service";
import { AuthGuard } from "./common/guards/auth.guard";

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
