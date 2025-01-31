import { Mapper } from "@/@core/presentation/mapper";
import { PasswordOutsideRange } from "../../domain/value-objects/password";
import { Exception } from "@/@core/base/exception";

export class PasswordOutsideRangeMapper
  implements Mapper<PasswordOutsideRange, PasswordOutsideRangeViewModel>
{
  readonly code = "password_outside_range";

  map(from: PasswordOutsideRange): PasswordOutsideRangeViewModel {
    return {
      code: "password_outside_range",
      message: `A senha deve ter no mínimo ${from.minLength} e no máximo ${from.maxLength} caracteres.`,
    };
  }
}

export interface PasswordOutsideRangeViewModel
  extends Exception<"password_outside_range"> {}
