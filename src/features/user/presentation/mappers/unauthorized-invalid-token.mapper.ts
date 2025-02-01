import { Mapper } from "@/@core/presentation/mapper";
import { UnauthorizedInvalidToken } from "../../application/services/auth-token.service";
import { Exception } from "@/@core/base/exception";

export class UnauthorizedInvalidTokenMapper
  implements Mapper<UnauthorizedInvalidToken, UnauthorizedInvalidTokenViewModel>
{
  readonly code = "unauthorized_invalid_token";

  map(_: UnauthorizedInvalidToken): UnauthorizedInvalidTokenViewModel {
    return {
      code: "unauthorized",
      message: "Sem autorização! Token inválido.",
    } as const;
  }
}

export interface UnauthorizedInvalidTokenViewModel
  extends Exception<"unauthorized"> {}
