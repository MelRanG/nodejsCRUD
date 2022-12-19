import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import {Article} from "../../article/domain/article"

@Entity("USER")
export class User {
  @PrimaryGeneratedColumn()
    id!: number
  @Column()
    userId?: string
  @Column()
    name?: string
  @OneToMany((type) => Article, (article) => article.user)
    article?: Article[]
}