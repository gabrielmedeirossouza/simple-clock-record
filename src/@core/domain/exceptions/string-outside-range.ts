import { Exception } from "@/@core/base/exception";

export interface StringOutsideRange<T extends string> extends Exception<T> {
  readonly value: string;
  readonly minLength: number;
  readonly maxLength: number;
}
