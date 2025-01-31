import { Result } from "@/@core/base/result";
import { User } from "../../domain/user";
import { InternalServerError } from "@/@core/application/exceptions/internal-server-error";

export interface UserRepository {
  create(user: User): Promise<Result<void, InternalServerError>>;
}
