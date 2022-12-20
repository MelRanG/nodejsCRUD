import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import {Article} from "../../article/domain/article"

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
    user_id!: number
  @Column()
    name?: string
  @OneToMany((type) => Article, (article) => article.user)
    article?: Article[]
}