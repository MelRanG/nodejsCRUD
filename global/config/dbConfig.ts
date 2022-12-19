import { createConnection, ConnectionOptions, getConnection } from "typeorm";
import { User } from "../../domain/user/domain/user"
import { Article } from "../../domain/article/domain/article"
import { Picture } from "../../domain/picture/domain/picture"


const options: ConnectionOptions = {
    type: "sqlite",
    database: ":memory:",
    entities: [User, Article, Picture],
    synchronize: true,
    logging: true
}

const create = async () => {
    return await createConnection(options)
}
const close = async () => {
    await getConnection().close()
}

create()
// const connection = await createConnection(options)
export {create, close}
