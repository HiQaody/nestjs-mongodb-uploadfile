import { ConfigService } from '@nestjs/config';
export declare class CompressionImageService {
    private readonly configService;
    private readonly qualities;
    private readonly logger;
    private readonly maxSizeInBytes;
    private readonly storagePath;
    constructor(configService: ConfigService);
    private ensureStoragePathExists;
    compressImage(buffer: Buffer, quality?: 'high' | 'medium' | 'low', maxWidth?: number): Promise<string>;
}
