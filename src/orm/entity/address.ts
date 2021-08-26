import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

export interface IAddress {
    id: string;
    inCareOf: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    zipcode: string;
}

@Entity("addresses")
export class Address implements IAddress {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: true,
        length: 50
    })
    inCareOf: string;

    @Column({
        nullable: true,
        length: 50
    })
    line1: string;

    @Column({
        nullable: true,
        length: 50
    })
    line2: string;

    @Column({
        nullable: true,
        length: 50
    })
    city: string;

    @Column({
        nullable: true,
        length: 50
    })
    state: string;

    @Column({
        nullable: true,
        length: 10
    })
    zipcode: string;

}
