import {Voyage} from './voyages.types';
import {Station} from './stations.types';
import {Geometry} from './geometry.types';

export interface Trace {
    id: string;
    numeroLigne: string;
    voyage: Voyage;
    depart: Station;
    destination: Station;
    between: Station[];
    geometry: Geometry;
    record_timestamp: string;
    transport: string;
    departureDate: string;
    arrivalDate: string;
}

