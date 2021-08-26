import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

export enum Roles {
    BASIC = "basic",
    ADMIN = "admin"
}

export interface IUser {
    id: string;
    email: string;
    roles: Roles[];
    displayName: string;
    firstName: string;
    lastName: string;
    phone: string;
}

@Entity("users")
export class User implements IUser {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        unique: true,
        length: 100
    })
    email: string;

    @Column({
        type: "set",
        enum: Roles,
        default: [Roles.BASIC]
    })
    roles: Roles[];

    @Column({
        nullable: true,
        length: 100
    })
    displayName: string;

    @Column({
        nullable: true,
        length: 100
    })
    firstName: string;

    @Column({
        nullable: true,
        length: 100
    })
    lastName: string;

    @Column({
        nullable: true,
        length: 100
    })
    phone: string;

}
