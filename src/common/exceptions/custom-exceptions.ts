import { HttpException, HttpStatus } from "@nestjs/common";

/**
 * リソースが見つからない場合の例外
 */
export class NotFoundException extends HttpException {
  constructor(resource: string) {
    super(`${resource} not found`, HttpStatus.NOT_FOUND);
  }
}

/**
 * 認証エラーの例外
 */
export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized") {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

/**
 * バリデーションエラーの例外
 */
export class ValidationException extends HttpException {
  constructor(errors: string[]) {
    super({ message: "Validation failed", errors }, HttpStatus.BAD_REQUEST);
  }
}
