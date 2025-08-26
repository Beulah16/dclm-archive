import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Ministration } from './Ministration';

@Entity()
export class Minister extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ type: 'text', nullable: true })
    bio?: string | null;

    @Column({ nullable: true })
    city?: string | null;

    @Column({ nullable: true })
    state?: string | null;

    @Column({ nullable: true })
    country?: string | null;

    @OneToMany(() => Ministration, (ministration) => ministration.minister)
    ministrations?: Ministration[];
}
