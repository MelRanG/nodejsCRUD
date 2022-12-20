import { createConnection, ConnectionOptions, getConnection } from "typeorm";
import { User } from "../../domain/user/domain/user"
import { Article } from "../../domain/article/domain/article"
import { Picture } from "../../domain/picture/domain/picture"


const options: ConnectionOptions = {
    type: "sqlite",
    database: ":memory:",
    entities: [User, Article, Picture],
    synchronize: true,
    logging: false
}

const create = async () => {
    return await createConnection(options)
}

const close = async () => {
    await getConnection().close()
}

const clear = async () => {
  const connection = getConnection()
  const entities = connection.entityMetadatas

  entities.forEach(async (entity) => {
    const repository = connection.getRepository(entity.name)
      await repository.query(`DELETE FROM ${entity.tableName}`)
      await repository.query(`UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='${entity.tableName}'`);
  })
}

create()
// const connection = await createConnection(options)
export {create, close, clear}
