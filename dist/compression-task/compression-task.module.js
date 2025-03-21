"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressionTaskModule = void 0;
const common_1 = require("@nestjs/common");
const compression_task_service_1 = require("./compression-task.service");
const schedule_1 = require("@nestjs/schedule");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("../products/schemas/product.schema");
const upload_image_1 = require("../utils/upload_image");
const compression_image_1 = require("../utils/compression_image");
let CompressionTaskModule = class CompressionTaskModule {
};
exports.CompressionTaskModule = CompressionTaskModule;
exports.CompressionTaskModule = CompressionTaskModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }]),
        ],
        providers: [compression_task_service_1.CompressionTaskService, upload_image_1.UploadService, compression_image_1.CompressionImageService]
    })
], CompressionTaskModule);
//# sourceMappingURL=compression-task.module.js.map