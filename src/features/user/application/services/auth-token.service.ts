import { Result } from "@/@core/base/result";
import { Exception } from "@/@core/base/exception";
import { UserSafeEntity } from "../../domain/user";

export interface AuthTokenService {
  generateAccessToken(sub: string, tokenData: Record<any, any>): string;

  verifyAccessToken(
    token: string,
  ): Result<
    UserSafeEntity,
    UnauthorizedInvalidToken | UnauthorizedExpiredToken
  >;
}

export interface UnauthorizedInvalidToken
  extends Exception<"unauthorized_invalid_token"> {}

export interface UnauthorizedExpiredToken
  extends Exception<"unauthorized_expired_token"> {}
