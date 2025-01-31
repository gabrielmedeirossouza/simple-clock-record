import { Exception } from "../base/exception";

export interface Mapper<
  From extends Exception<string>,
  To extends Exception<string>,
> {
  readonly code: From["code"];
  map(from: From): To;
}
