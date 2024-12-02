export class ApiError extends Error {
    status: number;
    errors: any[];

    constructor(status: number, message: string, errors: any[] = []){
        super(message)
        this.status = status
        this.errors = errors
    }

    static BadRequest(message: string, errors: any[] = []) {
        return new ApiError(400, message, errors);
    }
    static NotFound( message: string, errors: any[] = []) {
        return new ApiError(404, message, errors)
    }
    static UnauthorizedError() {
        return new ApiError(401, "User is not authorized");
    }

    static ForbiddenError() {
        return new ApiError(403, "Access denied");
    }

    static InternalServerError(message: string = "Internal server error") {
        return new ApiError(500, message);
    }
}