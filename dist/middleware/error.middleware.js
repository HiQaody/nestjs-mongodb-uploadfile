"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const common_1 = require("@nestjs/common");
let ErrorMiddleware = class ErrorMiddleware {
    use(req, res, next) {
        try {
            next();
        }
        catch (error) {
            const status = error instanceof common_1.HttpException ? error.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            const message = error instanceof common_1.HttpException ? error.message : 'Internal Server Error';
            res.status(status).json({ statusCode: status, message });
        }
    }
};
exports.ErrorMiddleware = ErrorMiddleware;
exports.ErrorMiddleware = ErrorMiddleware = __decorate([
    (0, common_1.Injectable)()
], ErrorMiddleware);
//# sourceMappingURL=error.middleware.js.map