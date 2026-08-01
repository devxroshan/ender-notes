export class HttpException extends Error {
  public statusCode: number = 500;
  public msg: string = "Internal Server Exception";
  public details: any = "An unexpected error occurred on the server.";

  constructor(statusCode: number, msg: string, details?: any) {
    super(msg);
    this.statusCode = statusCode;
    this.msg = msg;
    this.details = details || {};

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends HttpException {
  constructor(message = "Bad Request", error?: string | object) {
    super(400, message, error);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized", error?: string | object) {
    super(401, message, error);
  }
}

export class PaymentRequiredException extends HttpException {
  constructor(message = "Payment Required", error?: string | object) {
    super(402, message, error);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = "Forbidden", error?: string | object) {
    super(403, message, error);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = "Not Found", error?: string | object) {
    super(404, message, error);
  }
}

export class MethodNotAllowedException extends HttpException {
  constructor(message = "Method Not Allowed", error?: string | object) {
    super(405, message, error);
  }
}

export class NotAcceptableException extends HttpException {
  constructor(message = "Not Acceptable", error?: string | object) {
    super(406, message, error);
  }
}

export class ProxyAuthenticationRequiredException extends HttpException {
  constructor(
    message = "Proxy Authentication Required",
    error?: string | object,
  ) {
    super(407, message, error);
  }
}

export class RequestTimeoutException extends HttpException {
  constructor(message = "Request Timeout", error?: string | object) {
    super(408, message, error);
  }
}

export class ConflictException extends HttpException {
  constructor(message = "Conflict", error?: string | object) {
    super(409, message, error);
  }
}

export class GoneException extends HttpException {
  constructor(message = "Gone", error?: string | object) {
    super(410, message, error);
  }
}

export class LengthRequiredException extends HttpException {
  constructor(message = "Length Required", error?: string | object) {
    super(411, message, error);
  }
}

export class PreconditionFailedException extends HttpException {
  constructor(message = "Precondition Failed", error?: string | object) {
    super(412, message, error);
  }
}

export class PayloadTooLargeException extends HttpException {
  constructor(message = "Payload Too Large", error?: string | object) {
    super(413, message, error);
  }
}

export class URITooLongException extends HttpException {
  constructor(message = "URI Too Long", error?: string | object) {
    super(414, message, error);
  }
}

export class UnsupportedMediaTypeException extends HttpException {
  constructor(message = "Unsupported Media Type", error?: string | object) {
    super(415, message, error);
  }
}

export class RangeNotSatisfiableException extends HttpException {
  constructor(message = "Range Not Satisfiable", error?: string | object) {
    super(416, message, error);
  }
}

export class ExpectationFailedException extends HttpException {
  constructor(message = "Expectation Failed", error?: string | object) {
    super(417, message, error);
  }
}

export class ImATeapotException extends HttpException {
  constructor(message = "I am a teapot", error?: string | object) {
    super(418, message, error);
  }
}

export class MisdirectedRequestException extends HttpException {
  constructor(message = "Misdirected Request", error?: string | object) {
    super(421, message, error);
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(message = "Unprocessable Entity", error?: string | object) {
    super(422, message, error);
  }
}

export class LockedException extends HttpException {
  constructor(message = "Locked", error?: string | object) {
    super(423, message, error);
  }
}

export class FailedDependencyException extends HttpException {
  constructor(message = "Failed Dependency", error?: string | object) {
    super(424, message, error);
  }
}

export class TooEarlyException extends HttpException {
  constructor(message = "Too Early", error?: string | object) {
    super(425, message, error);
  }
}

export class UpgradeRequiredException extends HttpException {
  constructor(message = "Upgrade Required", error?: string | object) {
    super(426, message, error);
  }
}

export class PreconditionRequiredException extends HttpException {
  constructor(message = "Precondition Required", error?: string | object) {
    super(428, message, error);
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(message = "Too Many Requests", error?: string | object) {
    super(429, message, error);
  }
}

export class RequestHeaderFieldsTooLargeException extends HttpException {
  constructor(
    message = "Request Header Fields Too Large",
    error?: string | object,
  ) {
    super(429, message, error);
  }
}

export class UnavailableForLegalReasonsException extends HttpException {
  constructor(
    message = "Unavailable For Legal Reasons",
    error?: string | object,
  ) {
    super(451, message, error);
  }
}

export class InternalServerException extends HttpException {
  constructor(message = "Internal Server Exception", error?: string | object) {
    super(500, message, error);
  }
}

export class NotImplementedException extends HttpException {
  constructor(message = "Not Implemented", error?: string | object) {
    super(501, message, error);
  }
}

export class BadGatewayException extends HttpException {
  constructor(message = "Bad Gateway", error?: string | object) {
    super(502, message, error);
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message = "Service Unavailable", error?: string | object) {
    super(503, message, error);
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(message = "Gateway Timeout", error?: string | object) {
    super(504, message, error);
  }
}

export class HTTPVersionNotSupportedException extends HttpException {
  constructor(message = "HTTP Version Not Supported", error?: string | object) {
    super(505, message, error);
  }
}

export class VariantAlsoNegotiatesException extends HttpException {
  constructor(message = "Variant Also Negotiates", error?: string | object) {
    super(426, message, error);
  }
}

export class InsufficientStorageException extends HttpException {
  constructor(message = "Insufficient Storage", error?: string | object) {
    super(507, message, error);
  }
}

export class LoopDetectedException extends HttpException {
  constructor(message = "Loop Detected", error?: string | object) {
    super(425, message, error);
  }
}

export class NotExtendedException extends HttpException {
  constructor(message = "Not Extended", error?: string | object) {
    super(428, message, error);
  }
}

export class NetworkAuthenticationRequiredException extends HttpException {
  constructor(
    message = "Network Authentication Required",
    error?: string | object,
  ) {
    super(428, message, error);
  }
}
