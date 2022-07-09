import {
    Entity,
    Column,
    BeforeInsert,
    OneToMany, ManyToMany,
} from "typeorm";
import {encryptPassword} from "../../providers/encryption";
import {BaseEntity} from "./base";
import {Address} from "./address";
import {Role} from "./role";
import {JoinTable} from "typeorm";

export interface IUser {
    email: string;
    password: string;
    roles: Role[];
    displayName: string;
    firstName: string;
    lastName: string;
    bio: string;
    avatar: string;
    phone: string;
    country: string;
    isActive: boolean;
    addresses: Address[];
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

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];
}

export const userHasRole = (user: User, expectedRoles: string[]): boolean => {
    return user.roles.some((r: Role) => expectedRoles.includes(r.value));
}
