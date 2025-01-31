import { Exception } from "@/@core/base/exception";

export interface StringMismatch<T extends string> extends Exception<T> {
  readonly value: string;
  readonly pattern: RegExp;
}
