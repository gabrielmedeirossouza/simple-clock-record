import { Mapper } from "@/@core/presentation/mapper";
import { EmailTooLong } from "../../domain/value-objects/email";
import { Exception } from "@/@core/base/exception";

export class EmailTooLongMapper
  implements Mapper<EmailTooLong, EmailTooLongViewModel>
{
  readonly code = "email_too_long";

  map(from: EmailTooLong): EmailTooLongViewModel {
    return {
      code: "email_too_long",
      message: `O email deve ter no máximo ${from.maxLength} caracteres.`,
    };
  }
}

export interface EmailTooLongViewModel extends Exception<"email_too_long"> {}
