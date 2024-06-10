import User from '../../../DB/models/user.models.js'
import { Op } from 'sequelize'

//...................................getallusers.................................
export const getAllUsers = async(req,res,next)=>{
    const users= await User.findAll()  
    res.json({
        message:'done',
        users
    })
}

//..................................sign up................................
export const signUp = async(req,res,next)=>{
    const {name,email,password,age}= req.body
    const isEmailExist= await User.findOne({
        where: {email:email}
    })
    if (isEmailExist){
        return res.json({message: 'email already exists'})
    }
    const newUser = await User.create({name,email,password,age})
    if(newUser._options.isNewRecord){
        return res.json({message :'signedup successfully'})
    }
    return res.json({message: 'signup failed'})
}

//..................................sign in..............................
export const signIn = async (req,res,next)=>{
    const {email,password} = req.body
    const isEmailExist = await User.findOne({
        where:{email:email}
    })
    if(!isEmailExist){
        return res.json({message:'user not exist'})
    }
    const isPasswordValid = await User.findOne({
        where:{password:password}
    })
    if(!isPasswordValid){
        return res.json({message:'password not valid'})
    }
    return res.json({message:'sign in successfully'})
}

//................................updateuser....................
export const updateUser = async (req,res,next)=>{
    const {id} = req.params
    const {name,email,password,age}= req.body
    const isUserExist = await User.findByPk(id)
    if(!isUserExist){
        return res.json({message:'user not found'})
    }
    const newUpdate = await User.update({name,email,password,age},
    
        {where: {id:id}
        })
        console.log({newUpdate});
    if(newUpdate){
        return res.json({message :'updated successfully'})
    }
    return res.json({message: 'updated failed'})
}

//...........................deleteuser..................
export const deleteUser = async (req,res,next)=>{
    const {id} = req.params
    const isUserExist = await User.findByPk(id)
    if(!isUserExist){
        return res.json({message:'user not found'})
    }
    const newDelete = await User.destroy(
        {where: {id:id}
        })
    if(newDelete){
        return res.json({message :'deleted successfully'})
    }
    return res.json({message: 'deleted failed'})
}

//.....................finduserwhere......................
export const getUserWhere = async(req,res,next)=>{
    const users= await User.findAll({
        where:{
            name: {
                [Op.like]: 'a%'
            },
            age: {
                [Op.lt]: 30
            }
        } 
    })  
    res.json({
        message:'done',
        users
    })
}

//...............................whereAgeBetween.................
export const getUserByAge = async(req,res,next)=>{
    const users= await User.findAll({
        where:{
            age: {
                [Op.between]: [20,30]
            }
        } 
    })  
    res.json({
        message:'done',
        users
    })
}

//...............................3 oldest users..........................
export const getByGreatestAge = async(req,res,next)=>{
    const users = await User.findAll({
        order: [['age', 'DESC']],
        limit: 3 
    });
    
    return res.json({
        message: 'done',
        users
    });
    
}

//................................searchbyids........................
export const getUserByIds = async(req,res,next)=>{
    const {id} = req.body
    const users= await User.findAll({
        where:{
                id:{ [Op.in]: id }
        } 
    })  
    return res.json({
        message:'done',
        users
    })
}