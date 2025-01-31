export interface Exception<T extends string> {
  readonly code: T;
  readonly message: string;
}
