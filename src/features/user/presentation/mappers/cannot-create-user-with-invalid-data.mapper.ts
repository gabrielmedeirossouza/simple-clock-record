import { Mapper } from "@/@core/presentation/mapper";
import { CannotCreateUserWithInvalidData } from "../../domain/user";
import { Exception } from "@/@core/base/exception";
import {
  NameRequiredMapper,
  NameRequiredViewModel,
} from "./name-required.mapper";
import {
  NameTooLongMapper,
  NameTooLongViewModel,
} from "./name-too-long.mapper";
import {
  EmailRequiredMapper,
  EmailRequiredViewModel,
} from "./email-required.mapper";
import {
  EmailTooLongMapper,
  EmailTooLongViewModel,
} from "./email-too-long.mapper";
import {
  EmailInvalidFormatMapper,
  EmailInvalidFormatViewModel,
} from "./email-invalid-format.mapper";
import {
  PasswordOutsideRangeMapper,
  PasswordOutsideRangeViewModel,
} from "./password-outside-range.mapper";
import { MapperService } from "@/@core/presentation/mapper.service";

export class CannotCreateUserWithInvalidDataMapper
  implements
    Mapper<
      CannotCreateUserWithInvalidData,
      CannotCreateUserWithInvalidDataViewModel
    >
{
  readonly code = "cannot_create_user_with_invalid_data";

  private static userMapperService = new MapperService([
    new NameRequiredMapper(),
    new NameTooLongMapper(),
    new EmailRequiredMapper(),
    new EmailTooLongMapper(),
    new EmailInvalidFormatMapper(),
    new PasswordOutsideRangeMapper(),
  ]);

  map(
    from: CannotCreateUserWithInvalidData,
  ): CannotCreateUserWithInvalidDataViewModel {
    const exceptions = from.exceptions.map((exception) => {
      return CannotCreateUserWithInvalidDataMapper.userMapperService.map(
        exception,
      );
    });

    return {
      code: "cannot_create_user_with_invalid_data",
      message:
        from.exceptions.length === 1
          ? "O usuário não pôde ser criado pois existe 1 erro de validação."
          : `O usuário não pôde ser criado pois existem ${from.exceptions.length} erros de validação.`,
      exceptions,
    };
  }
}

export interface CannotCreateUserWithInvalidDataViewModel
  extends Exception<"cannot_create_user_with_invalid_data"> {
  readonly exceptions: (
    | NameRequiredViewModel
    | NameTooLongViewModel
    | EmailRequiredViewModel
    | EmailTooLongViewModel
    | EmailInvalidFormatViewModel
    | PasswordOutsideRangeViewModel
  )[];
}
