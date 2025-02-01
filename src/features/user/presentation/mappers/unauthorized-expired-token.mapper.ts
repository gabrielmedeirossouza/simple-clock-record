import { Mapper } from "@/@core/presentation/mapper";
import { UnauthorizedExpiredToken } from "../../application/services/auth-token.service";
import { Exception } from "@/@core/base/exception";

export class UnauthorizedExpiredTokenMapper
  implements Mapper<UnauthorizedExpiredToken, UnauthorizedExpiredTokenViewModel>
{
  readonly code = "unauthorized_expired_token";

  map(_: UnauthorizedExpiredToken): UnauthorizedExpiredTokenViewModel {
    return {
      code: "unauthorized",
      message: "Sem autorização! Token expirado.",
    } as const;
  }
}

export interface UnauthorizedExpiredTokenViewModel
  extends Exception<"unauthorized"> {}
