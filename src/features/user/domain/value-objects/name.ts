import { Failure, Result, Success } from "@/@core/base/result";
import { StringRequired } from "@/@core/domain/exceptions/string-required";
import { StringTooLong } from "@/@core/domain/exceptions/string-too-long";

export class Name {
  private constructor(public readonly value: string) {}

  static create(name: string): Result<Name, NameRequired | NameTooLong> {
    const nameVo = new Name(name);

    const validationResult = nameVo.validate();
    if (validationResult.isFailure) return validationResult;

    return new Success(nameVo);
  }

  private validate(): Result<void, NameRequired | NameTooLong> {
    const MAX_LENGTH = 250;

    if (!this.value)
      return new Failure({
        code: "name_required",
        message: "Name is required.",
      } as const);

    if (this.value.length > MAX_LENGTH)
      return new Failure({
        code: "name_too_long",
        message: `Name must have a maximum of ${MAX_LENGTH} characters, however, it has ${this.value.length} characters. Given value [${this.value}].`,
        value: this.value,
        maxLength: MAX_LENGTH,
      } as const);

    return new Success(undefined);
  }
}

export interface NameRequired extends StringRequired<"name_required"> {}
export interface NameTooLong extends StringTooLong<"name_too_long"> {}
