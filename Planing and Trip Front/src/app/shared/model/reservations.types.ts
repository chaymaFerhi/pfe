import {Users} from './users.types';
import {Trace} from './traces.types';

export interface Reservation {
    id: string;
    user: Users;
    trace: Trace;
}

