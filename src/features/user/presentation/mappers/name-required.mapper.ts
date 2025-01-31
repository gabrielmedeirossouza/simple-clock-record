import { Mapper } from "@/@core/presentation/mapper";
import { NameRequired } from "../../domain/value-objects/name";
import { Exception } from "@/@core/base/exception";

export class NameRequiredMapper
  implements Mapper<NameRequired, NameRequiredViewModel>
{
  readonly code = "name_required";

  map(_: NameRequired): NameRequiredViewModel {
    return {
      code: "name_required",
      message: "O nome do usuário é obrigatório.",
    };
  }
}

export interface NameRequiredViewModel extends Exception<"name_required"> {}
