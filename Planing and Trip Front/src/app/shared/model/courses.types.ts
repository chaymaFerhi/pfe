import {Trainers} from './trainers.types';
import {Category} from './category.types';
import {Lessons} from './lessons.types';

export interface Courses {
    id?: string;
    title?: string;
    description?: string;
    coverName?: string;
    videoName?: string;
    cover?: string;
    video?: string;
    type?: string;
    category?: Category;
    trainer?: Trainers;
    duration?: number;
    lessons?:Lessons[];
    steps?: {
        id?: number;
        order?: number;
        title?: string;
        subtitle?: string;
        content?: string;
    }[];
    totalSteps?: number;
    updatedAt?: number;
    featured?: boolean;
    progress?: {
        currentStep?: number;
        completed?: number;
    };
    slug?: string;
}
