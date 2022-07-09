import {Column, Entity} from "typeorm";
import {BaseEntity} from "./base";

export interface IPrivilege {
     create: boolean;
     read: boolean;
     update: boolean;
     delete: boolean;
}

@Entity("privileges")
export class Privilege extends BaseEntity implements IPrivilege {
    @Column({nullable: false, default: false })
    create: boolean;
    @Column({nullable: false, default: true })
    read: boolean;
    @Column({nullable: false, default: false })
    update: boolean;
    @Column({nullable: false, default: false })
    delete: boolean;
}
