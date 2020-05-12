"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(name, id, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
        // Custom debugging information
        this.date = new Date();
        this.name = name;
        this.id = id;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom-error.js.map