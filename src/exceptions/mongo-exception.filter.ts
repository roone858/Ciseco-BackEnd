import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.CONFLICT; // HTTP status code for conflict
    console.log(exception.message);
    switch (exception.code) {
      case 11000:
        const fieldName = extractFieldName(exception.message);
        const errorMessage = `Duplicate ${fieldName}. The ${fieldName} already exists.`;
        // Send an error response to the client
        response.status(status).json({
          statusCode: status,
          message: errorMessage,
        });
        break;
      case 121:
        // Document failed validation
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Document validation failed. Please check your input.',
        });
        break;
      case 11600:
        // Interrupted operation
        response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'The operation was interrupted. Please try again later.',
        });
        break;

      case 17280:
        // Authentication failed
        response.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Authentication failed. Please check your credentials.',
        });
        break;

      default:
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}

function extractFieldName(errorMessage: string): string {
  // The error message typically looks like: "E11000 duplicate key error collection: dbname.collectionname index: fieldname_1 dup key: { fieldname: \"duplicate-value\" }"
  const matches = errorMessage.match(/index: (\w+)_\d+ dup key/);
  return matches ? matches[1] : '';
}
