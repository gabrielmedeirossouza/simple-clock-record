import { Result, Success } from "@/@core/base/result";
import { CannotCreateUserWithInvalidData, User } from "../../domain/user";
import { InternalServerError } from "@/@core/application/exceptions/internal-server-error";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<
    Result<User, CannotCreateUserWithInvalidData | InternalServerError>
  > {
    const userCreationResult = User.create(name, email, password);
    if (userCreationResult.isFailure) return userCreationResult;

    const user = userCreationResult.value;

    const userRepositoryCreationResult = await this.userRepository.create(user);
    if (userRepositoryCreationResult.isFailure)
      return userRepositoryCreationResult;

    return new Success(user);
  }
}
