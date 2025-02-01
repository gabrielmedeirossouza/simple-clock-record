import { Exception } from "@/@core/base/exception";

export interface StringNotEquals<T extends string> extends Exception<T> {
  readonly expected: string;
  readonly received: string;
}
