import { DataTypes } from "sequelize";
import { sql_config } from "../connection.js";
import User from './user.models.js'

const Note = sql_config.define('tbl_notes', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type: DataTypes.STRING(255),
        unique:true
    },
    content:{
        type: DataTypes.STRING(255),
        required:true
    },
    userID:{
        type: DataTypes.INTEGER,
        required:true
    }
},
    {timestamps:true}
)
User.hasMany(Note, { foreignKey: 'userID' });
Note.belongsTo(User, { foreignKey: 'userID' });

export default Note