import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from 'typeorm';
import { Ministration } from './Ministration';

@Entity()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    name!: string;

    @ManyToMany(() => Ministration, (ministration) => ministration.tags)
    ministrations?: Ministration[];
}
