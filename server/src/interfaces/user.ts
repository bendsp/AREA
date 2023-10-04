export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    surname: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}