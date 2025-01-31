import { Failure, Result, Success } from "@/@core/base/result";
import { StringMismatch } from "@/@core/domain/exceptions/string-mismatch";
import { StringRequired } from "@/@core/domain/exceptions/string-required";
import { StringTooLong } from "@/@core/domain/exceptions/string-too-long";

export class Email {
  private constructor(public readonly value: string) {}

  public static create(
    value: string,
  ): Result<Email, EmailRequired | EmailTooLong | EmailInvalidFormat> {
    const instance = new Email(value);

    const validationResult = instance.validate(value);

    if (validationResult.isFailure) return validationResult;

    return new Success(new Email(value));
  }

  private validate(
    email: string,
  ): Result<void, EmailRequired | EmailTooLong | EmailInvalidFormat> {
    const MAX_LENGTH = 250;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return new Failure({
        code: "email_required",
        message: "Email is required.",
      } as const);
    }

    if (email.length > MAX_LENGTH) {
      return new Failure({
        code: "email_too_long",
        message: `Email must be less than ${MAX_LENGTH} characters.`,
        value: email,
        maxLength: MAX_LENGTH,
      } as const);
    }

    if (!EMAIL_REGEX.test(email)) {
      return new Failure({
        code: "email_invalid_format",
        message: "Email is invalid.",
        value: email,
        pattern: EMAIL_REGEX,
      } as const);
    }

    return new Success(undefined);
  }
}

export interface EmailRequired extends StringRequired<"email_required"> {}
export interface EmailTooLong extends StringTooLong<"email_too_long"> {}
export interface EmailInvalidFormat
  extends StringMismatch<"email_invalid_format"> {}
