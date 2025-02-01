import {
  AuthTokenService,
  UnauthorizedExpiredToken,
  UnauthorizedInvalidToken,
} from "../application/services/auth-token.service";
import { secretKey } from "../../../@core/infrastructure/environment";
import { Failure, Result, Success } from "../../../@core/base/result";
import { UserSafeEntity } from "../domain/user";
import { createHmac, timingSafeEqual } from "node:crypto";

export class JwtAuthTokenService implements AuthTokenService {
  generateAccessToken(sub: string, tokenData: Record<any, any>): string {
    const NOW = Math.floor(Date.now() / 1000);
    const ONE_HOUR = 60 * 60;

    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const headerBase64 = Buffer.from(JSON.stringify(header)).toString(
      "base64url",
    );

    const payloadBase64 = Buffer.from(
      JSON.stringify({ sub, iat: NOW, exp: NOW + ONE_HOUR, ...tokenData }),
    ).toString("base64url");

    const signature = createHmac("sha256", secretKey)
      .update(`${headerBase64}.${payloadBase64}`)
      .digest("base64url");

    const accessToken = `${headerBase64}.${payloadBase64}.${signature}`;

    return accessToken;
  }

  verifyAccessToken(
    token: string,
  ): Result<
    UserSafeEntity,
    UnauthorizedInvalidToken | UnauthorizedExpiredToken
  > {
    const [headerBase64, payloadBase64, signature] = token.split(".");

    if (!headerBase64 || !payloadBase64 || !signature)
      return new Failure({
        code: "unauthorized_invalid_token",
        message: "Invalid token.",
      } as const);

    const expectedSignature = createHmac("sha256", secretKey)
      .update(`${headerBase64}.${payloadBase64}`)
      .digest("base64url");

    const signatureBuffer = Buffer.from(signature, "utf8");
    const expectedSignatureBuffer = Buffer.from(expectedSignature, "utf8");

    if (
      signatureBuffer.length !== expectedSignatureBuffer.length ||
      !timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
    )
      return new Failure({
        code: "unauthorized_invalid_token",
        message: "Invalid token.",
      } as const);

    let decodedPayload: Record<any, any>;

    try {
      decodedPayload = JSON.parse(
        Buffer.from(payloadBase64, "base64url").toString(),
      ) as Record<any, any>;
    } catch {
      return new Failure({
        code: "unauthorized_invalid_token",
        message: "Invalid token.",
      } as const);
    }

    const expired = Math.floor(Date.now() / 1000) > decodedPayload.exp;
    if (expired)
      return new Failure({
        code: "unauthorized_expired_token",
        message: "Token has expired.",
      } as const);

    return new Success({
      id: decodedPayload.sub as string,
      name: decodedPayload.name as string,
      email: decodedPayload.email as string,
    } as const);
  }
}
