import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import {Article} from "../../article/domain/article"

@Entity("PICTURE")
export class Picture {
  @PrimaryGeneratedColumn()
    id!: number
  @Column()
    content?: string
  @ManyToOne((type) => Article, (article:Article) => article.picture)
    article?:Article
}