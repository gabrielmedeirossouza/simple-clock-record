import { Result } from "@/@core/base/result";
import { User } from "../../domain/user";
import { InternalServerError } from "@/@core/application/exceptions/internal-server-error";
import { Exception } from "@/@core/base/exception";

export interface UserRepository {
  create(user: User): Promise<Result<void, InternalServerError>>;
  getByEmail(
    email: string,
  ): Promise<Result<User, CannotFindUserByEmail | InternalServerError>>;
}

export interface CannotFindUserByEmail
  extends Exception<"cannot_find_user_by_email"> {}
