import { Exception } from "@/@core/base/exception";

export interface StringTooLong<T extends string> extends Exception<T> {
  readonly value: string;
  readonly maxLength: number;
}
