export declare class UploadService {
    private readonly storagePath;
    private readonly logger;
    constructor();
    private ensureStoragePathExists;
    saveFile(file: Express.Multer.File): string;
    deleteFile(filename: string): void;
    getFilePath(filename: string): string;
    readFile(filename: string): Buffer;
    private generateUniqueFilename;
    generatePreview(filename: string): Promise<string>;
    generateOriginalPreview(filename: string): Promise<string>;
}
