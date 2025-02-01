import { Mapper } from "@/@core/presentation/mapper";
import { CannotFindUserByEmail } from "../../application/repositories/user.repository";
import { Exception } from "@/@core/base/exception";

export class CannotFindUserByEmailMapper
  implements Mapper<CannotFindUserByEmail, CannotFindUserByEmailViewModel>
{
  readonly code = "cannot_find_user_by_email";

  map(_: CannotFindUserByEmail): CannotFindUserByEmailViewModel {
    return {
      code: "invalid_credentials",
      message: "Credenciais inválidas.",
    } as const;
  }
}

export interface CannotFindUserByEmailViewModel
  extends Exception<"invalid_credentials"> {}
