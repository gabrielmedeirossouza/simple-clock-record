import { InternalServerError } from "@/@core/application/exceptions/internal-server-error";
import { Failure, Result, Success } from "@/@core/base/result";
import {
  CannotFindUserByEmail,
  UserRepository,
} from "../application/repositories/user.repository";
import { User } from "../domain/user";

export class InMemoryUserRepository implements UserRepository {
  private static users: User[] = [];

  constructor() {
    // In memory seed
    const adminUser = User.create(
      "Gabriel",
      "gabriel@mail.com",
      "123456",
    ).unwrap();
    InMemoryUserRepository.users.push(adminUser);
  }

  create(user: User): Promise<Result<void, InternalServerError>> {
    InMemoryUserRepository.users.push(user);

    return Promise.resolve(new Success(undefined));
  }

  getByEmail(
    email: string,
  ): Promise<Result<User, CannotFindUserByEmail | InternalServerError>> {
    const user = InMemoryUserRepository.users.find(
      (user) => user.email.value === email,
    );

    if (!user)
      return Promise.resolve(
        new Failure({
          code: "cannot_find_user_by_email",
          message: `User with email [${email}] does not exists.`,
        } as const),
      );

    return Promise.resolve(new Success(user));
  }
}
