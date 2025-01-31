import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
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

@Controller("user")
export class UserController {
  private static userMapperService = new MapperService([
    new CannotCreateUserWithInvalidDataMapper(),
    new InternalServerErrorMapper(),
  ]);

  constructor(private userService: UserService) {}

  @Post("create")
  async createUser(
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
      UserController.userMapperService.map(userServiceCreationResult.value),
    );
  }
}
