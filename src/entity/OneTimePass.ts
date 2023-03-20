import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

@Entity("one_time_pass_request")
export class OneTimePass {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: "phone",
        type: "varchar",
        length: 15
    })
    phone: string

    @Column({
        name: "otp_code",
        type: "varchar",
        length: 6
    })
    otpCode: string

    @Column()
    status: string

    @Column({
        name: "expiry_at",
        type: "varchar",
        length: 25
    })
    expiryAt: string;

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
