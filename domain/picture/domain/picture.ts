import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import {Article} from "../../article/domain/article"

@Entity("picture")
export class Picture {
  @PrimaryGeneratedColumn()
    picture_id!: number
  @Column()
    content?: string
  @ManyToOne(() => Article)
  @JoinColumn({name: 'article_id'})
  article?: Article
}