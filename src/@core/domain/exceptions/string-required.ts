import { Exception } from "@/@core/base/exception";

export interface StringRequired<T extends string> extends Exception<T> {}
