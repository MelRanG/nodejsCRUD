import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { User } from "../../user/domain/user"
import { Picture } from "../../picture/domain/picture"

@Entity("article")
export class Article {
  @PrimaryGeneratedColumn()
    article_id!: number
  @Column()
    content?: string
    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user!:User
  @OneToMany((type) => Picture, (picture) => picture.article)
    picture?: Picture[]
}