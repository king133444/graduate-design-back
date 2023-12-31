export class ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T | undefined;
  timestamp: string;
  success: boolean;

  constructor(statusCode = 200, message = 'Success', success = true, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = success;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data: T) {
    return new ApiResponse<T>(200, 'Success', true, data);
  }

  static badRequest<T>(message = 'Bad Request', data?: T) {
    return new ApiResponse<T>(400, message, false, data);
  }

  static unauthorized<T>(message = 'Unauthorized', data?: T) {
    return new ApiResponse<T>(401, message, false, data);
  }

  static notFound<T>(message = 'Not Found', data?: T) {
    return new ApiResponse<T>(404, message, false, data);
  }

  static internalError<T>(message = 'Internal Server Error', data?: T) {
    return new ApiResponse<T>(500, message, false, data);
  }
}
