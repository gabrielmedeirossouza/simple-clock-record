import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";

export const validationPipe = new ValidationPipe({
  exceptionFactory: (
    validationErrors: ValidationError[] = [],
  ): BadRequestException => {
    console.log(JSON.stringify(validationErrors, null, 4));
    return new BadRequestException({
      code: "invalid_argument",
      message:
        "Um ou mais argumentos não estão no formato esperado para essa requisição.",
      exceptions: [
        ...validationErrors.map((error) => ({
          field: error.property,
          rule: Object.keys(error.constraints || {}).join(" & "),
        })),
      ],
    });
  },
});
