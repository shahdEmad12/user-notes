import {Router} from 'express'
const router = Router()
import * as uc from './user.controller.js'

router.get('/', uc.getAllUsers)
router.post('/', uc.signUp)
router.get('/signin', uc.signIn)
router.put('/:id', uc.updateUser)
router.delete('/:id', uc.deleteUser)
router.get('/where', uc.getUserWhere)
router.get('/byAge', uc.getUserByAge)
router.get('/byGrAge', uc.getByGreatestAge)
router.get('/byIds', uc.getUserByIds)




export default router