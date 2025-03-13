"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateProductRequestDto {
}
exports.CreateProductRequestDto = CreateProductRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Le titre du produit' }),
    __metadata("design:type", String)
], CreateProductRequestDto.prototype, "titre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'La description du produit' }),
    __metadata("design:type", String)
], CreateProductRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Le prix du produit' }),
    __metadata("design:type", Number)
], CreateProductRequestDto.prototype, "prix", void 0);
//# sourceMappingURL=create-product.request.dto.js.map