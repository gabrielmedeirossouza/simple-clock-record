import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorResponse = exception.getResponse() as Record<string, any>;

    delete errorResponse.statusCode;

    response.status(exception.getStatus()).json(errorResponse);
  }
}
