import { InternalServerError } from "@/@core/application/exceptions/internal-server-error";
import { Mapper } from "../mapper";
import { Exception } from "@/@core/base/exception";

export class InternalServerErrorMapper
  implements Mapper<InternalServerError, InternalServerErrorViewModel>
{
  readonly code = "internal_server_error";

  map(_: InternalServerError): InternalServerErrorViewModel {
    return {
      code: "internal_server_error",
      message:
        "Ocorreu um erro inesperado em nossos servidores. Por favor, tente novamente mais tarde.",
    };
  }
}

export interface InternalServerErrorViewModel
  extends Exception<"internal_server_error"> {}
