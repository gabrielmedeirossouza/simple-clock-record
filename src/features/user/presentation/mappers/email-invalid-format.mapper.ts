import { Mapper } from "@/@core/presentation/mapper";
import { EmailInvalidFormat } from "../../domain/value-objects/email";
import { Exception } from "@/@core/base/exception";

export class EmailInvalidFormatMapper
  implements Mapper<EmailInvalidFormat, EmailInvalidFormatViewModel>
{
  readonly code = "email_invalid_format";

  map(_: EmailInvalidFormat): EmailInvalidFormatViewModel {
    return {
      code: "email_invalid_format",
      message: "O email deve ser fornecido em um formato válido.",
    };
  }
}

export interface EmailInvalidFormatViewModel
  extends Exception<"email_invalid_format"> {}
