"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = require("./custom-error");
class DuplicateError extends custom_error_1.CustomError {
    constructor(...params) {
        super('Duplicate Content Error', 100, ...params);
    }
}
exports.DuplicateError = DuplicateError;
//# sourceMappingURL=duplicate-error.js.map