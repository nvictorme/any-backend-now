import {Column, Entity, ManyToOne} from "typeorm";
import {BaseEntity} from "./base";
import {User} from "./user";

export interface IPrivilege {
    user: User;
    entity: string;
    admin: boolean;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}

export type ExpectedPrivilege = { entity: string, action: keyof Omit<IPrivilege, "user" | "entity">, value: boolean };

@Entity("privileges")
export class Privilege extends BaseEntity implements IPrivilege {

    @Column()
    entity: string;

    @Column({default: true})
    read: boolean;

    @Column({default: false})
    create: boolean;

    @Column({default: false})
    update: boolean;

    @Column({default: false})
    delete: boolean;

    @Column({default: false})
    admin: boolean;

    @ManyToOne(() => User, user => user.privileges)
    user: User;
}
