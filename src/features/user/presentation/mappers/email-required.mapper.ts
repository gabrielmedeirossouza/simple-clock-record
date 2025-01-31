import { Mapper } from "@/@core/presentation/mapper";
import { EmailRequired } from "../../domain/value-objects/email";
import { Exception } from "@/@core/base/exception";

export class EmailRequiredMapper
  implements Mapper<EmailRequired, EmailRequiredViewModel>
{
  readonly code = "email_required";

  map(_: EmailRequired): EmailRequiredViewModel {
    return {
      code: "email_required",
      message: "O email é obrigatório.",
    };
  }
}

export interface EmailRequiredViewModel extends Exception<"email_required"> {}
