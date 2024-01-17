export interface Users {
    id?: string;
    email?: string;
    password?: string;
    active?: boolean;
    photo?: string;
    role?: string;

    name: string;
    avatar?: string;
    status?: string;

    age: number;
    phonenumber: number;
    address: string;
    datedenaissance: Date;
    createdAt: Date;
}
