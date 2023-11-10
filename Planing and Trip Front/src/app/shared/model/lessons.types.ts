import {Quizs} from './quizs.types';

export interface Lessons {
    id?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    cover?: string;
    video?: string;
    quiz?: Quizs[];
}
