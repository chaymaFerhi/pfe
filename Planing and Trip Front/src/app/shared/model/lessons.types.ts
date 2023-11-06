import {Steps} from './steps.types';
import {Section} from './sections.types';
import {Quizs} from './quizs.types';
import {Station} from "./stations.types";

export interface Lessons {
    id?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    cover?: string;
    video?: string;
    step?: Steps;
    quiz?: Quizs[];
    sections?: Section[];
    course?: Station;
}
