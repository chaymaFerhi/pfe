
export interface Quizs {
    id?: string;
    competences?: string;
    post?: string;
    about?: string;
    cover?: string;
    url?: string;
}

export interface QuizsByLesson {
    id?: string;
    title?: string;
    quizs?: Quizs[];
}
