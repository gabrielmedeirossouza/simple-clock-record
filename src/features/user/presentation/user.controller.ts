import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateUserBody } from "./create-user.body";
import { MapperService } from "@/@core/presentation/mapper.service";
import { UserService } from "../application/services/user.service";
import { UserSafeEntity } from "../domain/user";
import {
  CannotCreateUserWithInvalidDataMapper,
  CannotCreateUserWithInvalidDataViewModel,
} from "./mappers/cannot-create-user-with-invalid-data.mapper";
import {
  InternalServerErrorMapper,
  InternalServerErrorViewModel,
} from "@/@core/presentation/mappers/internal-server-error.mapper";
import { AuthGuard } from "@/@core/presentation/guards/auth.guard";
import { User } from "@/@core/presentation/decorators/user.decorator";
import { SignInUserBody } from "./sign-in-user.body";
import {
  CannotFindUserByEmailMapper,
  CannotFindUserByEmailViewModel,
} from "./mappers/cannot-find-user-by-email.mapper";
import {
  PasswordNotEqualsMapper,
  PasswordNotEqualsViewModel,
} from "./mappers/password-not-equals.mapper";
import { AuthenticationService } from "../application/services/authentication.service";

@Controller("user")
export class UserController {
  private static createUserMapperService = new MapperService([
    new CannotCreateUserWithInvalidDataMapper(),
    new InternalServerErrorMapper(),
  ]);

  private static signInUserMapperService = new MapperService([
    new CannotFindUserByEmailMapper(),
    new PasswordNotEqualsMapper(),
    new InternalServerErrorMapper(),
  ]);

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
  ) {}

  @Post("create")
  @UseGuards(AuthGuard)
  async createUser(
    @User() user: UserSafeEntity,
    @Body() { name, email, password }: CreateUserBody,
  ): Promise<
    | UserSafeEntity
    | CannotCreateUserWithInvalidDataViewModel
    | InternalServerErrorViewModel
  > {
    const userServiceCreationResult = await this.userService.create(
      name,
      email,
      password,
    );

    if (userServiceCreationResult.isSuccess)
      return userServiceCreationResult.value.getSafeEntity();

    throw new BadRequestException(
      UserController.createUserMapperService.map(
        userServiceCreationResult.value,
      ),
    );
  }

  @Post("sign-in")
  async signIn(
    @Body() { email, password }: SignInUserBody,
  ): Promise<
    | { accessToken: string }
    | CannotFindUserByEmailViewModel
    | PasswordNotEqualsViewModel
  > {
    const authenticationResult = await this.authenticationService.authenticate(
      email,
      password,
    );

    if (authenticationResult.isSuccess)
      return { accessToken: authenticationResult.value };

    throw new BadRequestException(
      UserController.signInUserMapperService.map(authenticationResult.value),
    );
  }
}
