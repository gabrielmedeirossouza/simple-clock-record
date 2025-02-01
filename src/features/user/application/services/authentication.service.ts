import { Result, Success } from "@/@core/base/result";
import {
  CannotFindUserByEmail,
  UserRepository,
} from "../repositories/user.repository";
import { InternalServerError } from "@/@core/application/exceptions/internal-server-error";
import { PasswordNotEquals } from "../../domain/value-objects/password";
import { AuthTokenService } from "./auth-token.service";

export class AuthenticationService {
  constructor(
    private readonly UserRepository: UserRepository,
    private readonly authTokenService: AuthTokenService,
  ) {}

  async authenticate(
    email: string,
    password: string,
  ): Promise<
    Result<
      string,
      CannotFindUserByEmail | PasswordNotEquals | InternalServerError
    >
  > {
    const getUserByEmailResult = await this.UserRepository.getByEmail(email);
    if (getUserByEmailResult.isFailure) return getUserByEmailResult;

    const user = getUserByEmailResult.value;

    const passwordMatchResult = user.password.checkEquals(password);
    if (passwordMatchResult.isFailure) return passwordMatchResult;

    const userSafeEntity = user.getSafeEntity();

    const accessToken = this.authTokenService.generateAccessToken(
      userSafeEntity.id,
      {
        name: userSafeEntity.name,
        email: userSafeEntity.email,
      },
    );

    return new Success(accessToken);
  }
}
