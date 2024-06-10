import { Sequelize } from 'sequelize'
export const sql_config = new Sequelize('assignment4db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export const connection_db = async()=>{
    await sql_config.sync({alter:true, force:false})
    .then(res=> console.log('db connection success'))
    .catch((err)=>console.log('db connection fail', err))
}