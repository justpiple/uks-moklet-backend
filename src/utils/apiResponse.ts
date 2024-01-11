export function Success(message: string, otherResponses?: Object) {
  return { message, status: 200, success: true, ...otherResponses };
}

export function CreatedSuccessfully(message: string, otherResponses?: Object) {
  return { status: 201, message, success: true, ...otherResponses };
}

export function InternalServerError() {
  return { message: "Internal server error", status: 500, success: false };
}

export function Forbidden(message: string, error?: object) {
  return { message, status: 403, success: false, error };
}

export function Unauthorize(message: string) {
  return { message, status: 401, success: false };
}

export function BadRequest(message: string) {
  return { message, status: 400, success: false };
}
