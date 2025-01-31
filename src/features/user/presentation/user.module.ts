import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "../application/services/user.service";
import { UserRepositoryFactory } from "../infrastructure/user.repository.factory";

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
  ],
})
export class UserModule {}
