import {
    Entity,
    Column,
    BeforeInsert,
} from "typeorm";
import {createHmac} from "crypto";
import {BaseEntity} from "./base";

export enum Roles {
    BASIC = "basic",
    ADMIN = "admin"
}

export interface IUser {
    email: string;
    password: string;
    roles: Roles[];
    displayName: string;
    firstName: string;
    lastName: string;
    phone: string;
    isActive: boolean;
}

@Entity("users")
export class User extends BaseEntity implements IUser {

    @Column({
        unique: true,
        length: 100
    })
    email: string;

    @BeforeInsert()
    hashPassword() {
        this.password = createHmac("sha256", this.password).digest("hex");
    }

    @Column()
    password: string;

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

    @Column({type: "boolean", default: true})
    isActive: boolean;

}
