import { FirebaseService } from "@common/providers/firebase.service";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

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
    if (!token) {
      throw new UnauthorizedException("Bearer token is missing");
    }

    try {
      const decodedToken = await this.firebaseService.verifyToken(token);
      request["requesterId"] = decodedToken.uid;
      return true;
    } catch (error) {
      throw new UnauthorizedException({
        message: "Invalid or expired token",
        error: error.message,
      });
    }
  }
}
