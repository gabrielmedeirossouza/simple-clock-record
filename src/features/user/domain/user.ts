import { Failure, Result, Success } from "@/@core/base/result";
import { Name, NameRequired, NameTooLong } from "./value-objects/name";
import {
  Email,
  EmailInvalidFormat,
  EmailRequired,
  EmailTooLong,
} from "./value-objects/email";
import { Password, PasswordOutsideRange } from "./value-objects/password";
import { DomainRegistry } from "@/@core/domain/domain-registry";
import { Exception } from "@/@core/base/exception";

export class User {
  constructor(
    public id: string,
    public name: Name,
    public email: Email,
    public password: Password,
  ) {}

  static create(
    name: string,
    email: string,
    password: string,
  ): Result<User, CannotCreateUserWithInvalidData> {
    const nameVo = Name.create(name);
    const emailVo = Email.create(email);
    const passwordVo = Password.create(password);

    const validations = [nameVo, emailVo, passwordVo];
    if (Failure.some(validations))
      return new Failure({
        code: "cannot_create_user_with_invalid_data",
        message: "Cannot create user entity with invalid data.",
        exceptions: Failure.extract(validations),
      } as const);

    const uuid = DomainRegistry.uuidService.generate();

    const user = new User(
      uuid,
      nameVo.unwrap(),
      emailVo.unwrap(),
      passwordVo.unwrap(),
    );

    return new Success(user);
  }

  getSafeEntity(): UserSafeEntity {
    return {
      id: this.id,
      name: this.name.value,
      email: this.email.value,
    };
  }
}

export interface CannotCreateUserWithInvalidData
  extends Exception<"cannot_create_user_with_invalid_data"> {
  readonly exceptions: (
    | NameRequired
    | NameTooLong
    | EmailRequired
    | EmailTooLong
    | EmailInvalidFormat
    | PasswordOutsideRange
  )[];
}

export interface UserSafeEntity {
  readonly id: string;
  readonly name: string;
  readonly email: string;
}
