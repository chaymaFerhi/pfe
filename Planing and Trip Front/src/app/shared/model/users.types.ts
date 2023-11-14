export interface Users {
    id?: string;
    email?: string;
    password?: string;
    active?: boolean;
    picture?: string;
    role?: string;

    name: string;
    avatar?: string;
    status?: string;

    age: number;
    phonenumber: number;
    adresse: string;
    datedenaissance: Date;
    createdAt: Date;
}
