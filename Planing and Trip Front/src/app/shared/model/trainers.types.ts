import {Station} from './stations.types';
import {Users} from './users.types';

export interface Trainers {
    id?: string;
    competences?: string;
    post?: string;
    about?: string;
    cover?: string;
    url?: string;
    course?: Station;
    users?: Users;
}
