import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionBody extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message, statusCode);
  }
}
