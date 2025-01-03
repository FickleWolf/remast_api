import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { FirebaseService } from "../providers/firebase.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    //開発環境だったら認証をスキップ
    const env = process.env.ENV;
    if (env === "local") {
      request["requesterId"] = process.env.TEST_USER_ID;
      return true;
    }

    const authorization = request.headers["authorization"];

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new UnauthorizedException(
        "Missing or invalid authorization header",
      );
    }

    const token = authorization.split(" ")[1];

    try {
      const decodedToken = await this.firebaseService.verifyToken(token);
      request["requesterId"] = decodedToken.uid;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token", error);
    }
  }
}
