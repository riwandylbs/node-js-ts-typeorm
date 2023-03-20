import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert } from "typeorm"
import * as bcrypt from 'bcrypt';
import { Module } from "module";

export type userRoleType = "visitor" | "merchant" | "organizer"
export type userStatus   = "verified" | "unverified" | "inactive" | "blocked"
export type userRace     = "melayu" | "indian" | "chinese" | "none"

@Entity("app_users")
export class User {

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: "full_name",
        type: "varchar",
        length: 50
    })
    fullName: string

    @Column({
        name: "phone",
        type: "varchar",
        length: 20
    })
    phone: string

    @Column({
        name: "password",
        type: "varchar"
    })
    password: string

    @Column({
        name: "email",
        type: "varchar",
        unique: true
    })
    email: string

    @Column({
        name: "user_type",
        type: "enum",
        enum: ["visitor", "merchant", "organizer"],
        default: "visitor"
    })
    role: userRoleType

    @Column({
        name: "status",
        type: "enum",
        enum: ["verified", "unverified", "inactive", "blocked"],
        default: "unverified"
    })
    status: userStatus

    @Column({
        name: "ic_number",
        type: "varchar",
        length: 25
    })
    icNumber: string

    @Column({
        name: "gender",
        type: "varchar",
        length: 25
    })
    gender: string

    @Column({
        name: "nationality",
        type: "varchar",
        length: 50
    })
    nationality: string

    @Column({
        name: "state",
        type: "varchar",
        length: 50
    })
    state: string

    @Column({
        name: "city",
        type: "varchar",
        length: 50
    })
    city: string

    @Column({
        name: "post_code",
        type: "varchar",
        length: 50
    })
    postCode: string

    @Column({
        name: "address",
        type: "varchar"
    })
    address: string

    @Column({
        name: "referral_code",
        type: "varchar"
    })
    referralCode: string

    @Column({
        name: "profile_image",
        type: "varchar"
    })
    profileImage: string

    @Column({
        name: "bod",
        type: "varchar"
    })
    bod: string

    @Column({
        name: "age",
        type: "int"
    })
    age: number

    @Column({
        name: "race",
        type: "enum",
        enum: ["melayu", "indian", "chinese", "blocked"],
        default: "unverified"
    })
    race: string

    @Column({
        name: "email_verified_at",
    })
    emailVerifiedAt: string

    @Column({
        name: "blocked_at",
        type: "varchar"

    })
    blocked_at: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
