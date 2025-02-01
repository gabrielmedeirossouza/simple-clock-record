import { Mapper } from "@/@core/presentation/mapper";
import { PasswordNotEquals } from "../../domain/value-objects/password";
import { Exception } from "@/@core/base/exception";

export class PasswordNotEqualsMapper
  implements Mapper<PasswordNotEquals, PasswordNotEqualsViewModel>
{
  readonly code = "password_not_equals";

  map(_: PasswordNotEquals): PasswordNotEqualsViewModel {
    return {
      code: "invalid_credentials",
      message: "Credenciais inválidas.",
    } as const;
  }
}

export interface PasswordNotEqualsViewModel
  extends Exception<"invalid_credentials"> {}
