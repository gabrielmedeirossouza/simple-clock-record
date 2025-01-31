import { InternalServerError } from "@/@core/application/exceptions/internal-server-error";
import { Failure, Result, Success } from "@/@core/base/result";
import { UserRepository } from "../application/repositories/user.repository";
import { User } from "../domain/user";

export class InMemoryUserRepository implements UserRepository {
  private static users: User[] = [];

  constructor(private readonly forceFailure = false) {}

  create(user: User): Promise<Result<void, InternalServerError>> {
    if (this.forceFailure)
      return Promise.resolve(
        new Failure({
          code: "internal_server_error",
          message: "InMemoryUserRepository: Fake DB error.",
          details: "",
        } as const),
      );

    InMemoryUserRepository.users.push(user);

    return Promise.resolve(new Success(undefined));
  }
}
