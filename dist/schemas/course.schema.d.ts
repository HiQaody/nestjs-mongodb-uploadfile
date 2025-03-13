import { Document } from 'mongoose';
import { Category } from './category.schema';
export declare class Course extends Document {
    title_course: string;
    slug_course: string;
    description_course: string;
    id_category: Category;
    documents: string[];
}
export declare const CourseSchema: import("mongoose").Schema<Course, import("mongoose").Model<Course, any, any, any, Document<unknown, any, Course> & Course & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Course, Document<unknown, {}, import("mongoose").FlatRecord<Course>> & import("mongoose").FlatRecord<Course> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
