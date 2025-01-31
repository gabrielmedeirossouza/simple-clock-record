import { Failure, Result, Success } from "@/@core/base/result";
import { DomainRegistry } from "@/@core/domain/domain-registry";
import { StringOutsideRange } from "@/@core/domain/exceptions/string-outside-range";

export class Password {
  private constructor(public readonly value: string) {}

  public static create(value: string): Result<Password, PasswordOutsideRange> {
    const instance = new Password(value);

    const validationResult = instance.validate(value);

    if (validationResult.isFailure) return validationResult;

    const hashedPassword = DomainRegistry.hashService.hash(value);

    return new Success(new Password(hashedPassword));
  }

  public equals(password: string): boolean {
    return DomainRegistry.hashService.verify(password, this.value);
  }

  private validate(password: string): Result<void, PasswordOutsideRange> {
    if (password.length < 6 || password.length > 100)
      return new Failure({
        code: "password_outside_range",
        message: "Password must be between 6 and 100 characters.",
        value: password,
        minLength: 6,
        maxLength: 100,
      } as const);

    return new Success(undefined);
  }
}

export interface PasswordOutsideRange
  extends StringOutsideRange<"password_outside_range"> {}
