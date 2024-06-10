import express from 'express' 
import userRouter from './src/modules/User/user.routes.js'
import noteRouter from './src/modules/Note/note.routes.js'
import { connection_db } from './DB/connection.js'
const app = express()
app.use(express.json())
app.use(userRouter)
app.use(noteRouter)
connection_db()
const port = 3000


app.listen(port, ()=>console.log(`server running on ${port}`))