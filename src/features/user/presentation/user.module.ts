import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "../application/services/user.service";
import { UserRepositoryFactory } from "../infrastructure/user.repository.factory";
import { AuthenticationService } from "../application/services/authentication.service";
import { JwtAuthTokenService } from "../infrastructure/jwt-auth-token.service";

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: UserService,
      useFactory: (): UserService => {
        const userRepo = UserRepositoryFactory.getInstance();

        return new UserService(userRepo);
      },
    },
    {
      provide: AuthenticationService,
      useFactory: (): AuthenticationService => {
        const userRepo = UserRepositoryFactory.getInstance();
        const AuthTokenService = new JwtAuthTokenService();

        return new AuthenticationService(userRepo, AuthTokenService);
      },
    },
  ],
})
export class UserModule {}
