import { type } from "os"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export type userRoleType = "user" | "merchant"

@Entity("mobile_user")
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: "first_name",
        type: "varchar",
        length: 100
    })
    firstName: string

    @Column({
        name: "last_name",
        type: "varchar",
        length: 100
    })
    lastName: string

    @Column({
        type: "int"
    })
    age: number

    @Column({
        type: "varchar",
        length: 100,
        unique: true
    })
    email: string

    @Column({
        type: "enum",
        enum: ["user", "merchant"],
        default: "user"
    })
    role : userRoleType

}
