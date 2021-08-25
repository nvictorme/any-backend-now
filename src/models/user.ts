export enum Roles {
    Basic = 0,
    Admin = 1000
}

export interface IUser {
    id: string;
    email: string;
    roles: Roles[];
    displayName: string;
    firstName: string;
    lastName: string;
}
