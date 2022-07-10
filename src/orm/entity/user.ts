import {
    Entity,
    Column,
    BeforeInsert,
    OneToMany,
} from "typeorm";
import {encryptPassword} from "../../providers/encryption";
import {BaseEntity} from "./base";
import {Address} from "./address";
import {ExpectedPrivilege, IPrivilege, Privilege} from "./privilege";

export interface IUser {
    email: string;
    password: string;
    displayName: string;
    firstName: string;
    lastName: string;
    bio: string;
    avatar: string;
    phone: string;
    country: string;
    isActive: boolean;
    addresses: Address[];
    privileges: Privilege[];
}

@Entity("users")
export class User extends BaseEntity implements IUser {

    @Column({
        length: 100,
        unique: true,
    })
    email: string;

    @BeforeInsert()
    hashPassword() {
        this.password = encryptPassword(this.password);
    }

    @Column()
    password: string;

    @Column({
        nullable: true,
        unique: true,
        length: 30
    })
    displayName: string;

    @Column({
        nullable: true,
        length: 30
    })
    firstName: string;

    @Column({
        nullable: true,
        length: 30
    })
    lastName: string;

    @Column({
        nullable: true,
        length: 160,
    })
    bio: string;

    @Column({
        nullable: true,
        length: 50,
    })
    avatar: string;

    @Column({
        nullable: true,
        length: 20
    })
    phone: string;

    @Column({
        nullable: true,
        length: 5,
    })
    country: string;

    @Column({type: "boolean", default: true})
    isActive: boolean;

    @OneToMany(() => Address, address => address.user)
    addresses: Address[];

    @OneToMany(() => Privilege, privilege => privilege.user)
    privileges: Privilege[];
}

export const userHasPrivilege = (user: User, expected: ExpectedPrivilege): boolean => {
    return user.privileges.some((privilege: Privilege) =>
        privilege.entity === expected.entity
        && privilege[expected.action] === expected.value
    );
}
