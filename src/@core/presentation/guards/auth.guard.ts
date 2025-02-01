/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { MapperService } from "../mapper.service";
import { UnauthorizedInvalidTokenMapper } from "@/features/user/presentation/mappers/unauthorized-invalid-token.mapper";
import { UnauthorizedExpiredTokenMapper } from "@/features/user/presentation/mappers/unauthorized-expired-token.mapper";
import { UserApplicationRegistry } from "@/features/user/application/user-application-registry";
import { JwtAuthTokenService } from "@/features/user/infrastructure/jwt-auth-token.service";

@Injectable()
export class AuthGuard implements CanActivate {
  private static unauthorizedMapperService = new MapperService([
    new UnauthorizedInvalidTokenMapper(),
    new UnauthorizedExpiredTokenMapper(),
  ]);

  static {
    UserApplicationRegistry.authTokenService = new JwtAuthTokenService();
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new HttpException(
        {
          code: "unauthorized",
          message:
            "Sem autorização! Token não fornecido no cabeçalho da requisição.",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessTokenResult =
      UserApplicationRegistry.authTokenService.verifyAccessToken(token);

    if (accessTokenResult.isFailure)
      throw new HttpException(
        AuthGuard.unauthorizedMapperService.map(accessTokenResult.value),
        HttpStatus.UNAUTHORIZED,
      );

    request.user = accessTokenResult.value;

    return true;
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers["authorization"];
    if (!authHeader) return null;
    const [type, token] = authHeader.split(" ");
    return type === "Bearer" ? token : null;
  }
}
