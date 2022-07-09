import {Column, Entity, ManyToMany} from "typeorm"
import {BaseEntity} from "./base";
import {Privilege} from "./privilege";

export interface IRole {
    value: string;
    description?: string;
    privileges: Privilege[];
}

@Entity("roles")
export class Role extends BaseEntity implements IRole {
    @Column({nullable: false, unique: true, default: "basic" })
    value: string;
    @Column({nullable: true, default: "basic user role" })
    description: string;
    @ManyToMany(() => Privilege)
    privileges: Privilege[];
}
