import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "../../user/domain/user"
import { Picture } from "../../picture/domain/picture"

@Entity("ARTICLE")
export class Article {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    content?: string
  @ManyToOne((type) => User, (user:User) => user.article)
    user?:User
  @OneToMany((type) => Picture, (picture) => picture.article)
    picture?: Picture[]
}