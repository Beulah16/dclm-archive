import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { Minister } from './Minister';
import { Tag } from './Tag';
import { Category } from './Category';
import { MediaType } from '../types';

@Entity()
export class Ministration extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column({ type: 'text', nullable: true })
    text?: string | null;

    @Column({ type: 'text', nullable: true })
    codeDescription?: string | null;

    @ManyToOne(() => Category, (category) => category.ministrations, { nullable: true, eager: true })
    category?: Category | null;

    @Column({ type: 'enum', enum: MediaType, default: MediaType.AUDIO })
    mediaType!: MediaType;

    @ManyToOne(() => Minister, (minister) => minister.ministrations, { nullable: true, eager: true })
    minister?: Minister | null;

    @Column({ nullable: true })
    city?: string | null;

    @Column({ nullable: true })
    state?: string | null;

    @Column({ nullable: true })
    country?: string | null;

    @Column({ type: 'int', nullable: true })
    year?: number | null;

    @Column({ type: 'date', nullable: true })
    fullDate?: string | null;

    @Column({ type: 'text', nullable: true })
    mediaUrl?: string | null;

    @Column({ type: 'text', nullable: true })
    thumbnailUrl?: string | null;

    @ManyToMany(() => Tag, (tag) => tag.ministrations, { cascade: true, eager: true })
    @JoinTable()
    tags?: Tag[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
