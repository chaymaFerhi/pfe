export interface Users {
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    active?: boolean;
    picture?: string;
    roles?: any[];
    role?: string;

    name: string;
    avatar?: string;
    status?: string;

    age: number;
    phonenumber: number;
    photo: string;
    adresse: string;
    datedenaissance: Date;
    createdAt: Date;
}
