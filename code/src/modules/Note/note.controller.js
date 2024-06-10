import Note from '../../../DB/models/note.models.js'
import User from '../../../DB/models/user.models.js'

//......................addnote........................
export const addNote = async(req,res,next)=>{
    const {title,content,userID}= req.body
    const isNoteExist= await Note.findOne({
        where: {title:title}
    })
    if (isNoteExist){
        return res.json({message: 'note already exists'})
    }
    const newNote = await Note.create({title,content,userID})
    if(newNote._options.isNewRecord){
        return res.json({message :'added successfully'})
    }
    return res.json({message: 'added failed'})
}

//......................delete note.....................
export const deleteNote = async(req,res,next)=>{
    const {userid,id}= req.params
    const isUserValid = await Note.findByPk(userid,{
        where:{userid: Note.userID}
    })
    if(!isUserValid){
        return res.json({message:'user is not the owner'})
    }
    const isNoteExist = await Note.findByPk(id)
    if(!isNoteExist){
        return res.json({message:'note doesnt exist'})
    }
    const deleteNote = await Note.destroy({
        where: {id:id}
    })
    if(deleteNote){
        return res.json({message:'note deleted successfully'})
    }
}

//......................update note.....................
export const updateNote = async(req,res,next)=>{
    const {userid,id}= req.params
    const {title,content,userID}= req.body
    const isUserValid = await Note.findByPk(userid,{
        where:{userid: Note.userID}
    })
    if(!isUserValid){
        return res.json({message:'user is not the owner'})
    }
    const isNoteExist = await Note.findByPk(id)
    if(!isNoteExist){
        return res.json({message:'note doesnt exist'})
    }
    const updateNote = await Note.update({title,content,userID},{
        where: {id:id}
    })
    if(updateNote){
        return res.json({message:'note updated successfully'})
    }
}

//......................get all notes...................
export const getAllNotes = async(req,res,next)=>{
    const notes= await Note.findAll()  
    res.json({
        message:'done',
        notes
    })
}

//......................users with notes .................
export const getNotesWithUsers = async(req,res,next)=>{
    const notesAndUsers= await Note.findAll({
        include: [{
            model: User,
            attributes: ['id', 'name', 'email'],
            }], 
    })  
    res.json({
        message:'done',
        notesAndUsers
    })
}