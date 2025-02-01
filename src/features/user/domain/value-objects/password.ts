import { Failure, Result, Success } from "@/@core/base/result";
import { DomainRegistry } from "@/@core/domain/domain-registry";
import { StringNotEquals } from "@/@core/domain/exceptions/string-not-equals";
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

  public checkEquals(password: string): Result<void, PasswordNotEquals> {
    const equals = DomainRegistry.hashService.verify(password, this.value);

    if (!equals)
      return new Failure({
        code: "password_not_equals",
        message: "Password is not equals.",
        expected: "*",
        received: "*",
      } as const);

    return new Success(undefined);
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

export interface PasswordNotEquals
  extends StringNotEquals<"password_not_equals"> {}
