import {Router} from 'express'
const router = Router()
import * as nc from './note.controller.js'

router.post('/addNote', nc.addNote)
router.delete('/deleteNote/:userid/:id', nc.deleteNote)
router.put('/updateNote/:userid/:id', nc.updateNote)
router.get('/getNote', nc.getAllNotes)
router.get('/NoteWithUser', nc.getNotesWithUsers)


export default router