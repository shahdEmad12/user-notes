import { DataTypes } from "sequelize";
import { sql_config } from "../connection.js";

const User = sql_config.define('tbl_users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING,
        required:true
    },
    email:{
        type: DataTypes.STRING(255),
        unique:true
    },
    password:{
        type: DataTypes.INTEGER,
        required:true
    },
    age:{
        type: DataTypes.INTEGER,
        required:true
    }
},
    {timestamps:true}
)


export default User
