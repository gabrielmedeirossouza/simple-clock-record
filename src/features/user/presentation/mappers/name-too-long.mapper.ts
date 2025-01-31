import { Mapper } from "@/@core/presentation/mapper";
import { NameTooLong } from "../../domain/value-objects/name";
import { Exception } from "@/@core/base/exception";

export class NameTooLongMapper
  implements Mapper<NameTooLong, NameTooLongViewModel>
{
  readonly code = "name_too_long";

  map(from: NameTooLong): NameTooLongViewModel {
    return {
      code: "name_too_long",
      message: `O nome do usuário deve ter no máximo ${from.maxLength} caracteres.`,
    };
  }
}

export interface NameTooLongViewModel extends Exception<"name_too_long"> {}
