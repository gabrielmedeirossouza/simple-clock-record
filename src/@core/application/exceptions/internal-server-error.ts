import { Exception } from "@/@core/base/exception";

export interface InternalServerError
  extends Exception<"internal_server_error"> {
  readonly details: string;
}
