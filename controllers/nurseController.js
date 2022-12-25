const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()

exports.getAllNurses=async (req,res)=>{
try{
    const Nurses=await prisma.nurse.findMany()
    if(!Nurses){
        return res.status(404).json({
            status:404,
            message:" no Nurses were found"
        })
    }
    return res.status(200).json({
        status:200,
        data:Nurses
    })
}
catch(err){
return res.status(500).json({status:500,
message:"an error occurred while trying to get the Nurses"
})
}
}

exports.getNurse=async(req,res)=>{
    try{
        const id=req.params.id *1
    if(!id) {return res.status(400).json({status:400,message:"invalide id"})}
    const Nurse=await prisma.nurse.findFirst({
        where:{
            id
        }
    })
    if(!Nurse){
        return res.status(404).json({
            status:404,
            message:"Nurse not found"
        })
    }
    return res.status(200).json({
        status:200,
        data:Nurse
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred while trying to get Nurse"
        })
    }
}
exports.AddNurse=async(req,res)=>{
    try{
        const {id,nom} = req.body
        if(!id || !nom){
            return res.status(400).json({status:400,message:'missing data'})
        }
        const Nurse=await prisma.nurse.create({
            data:{
                id,nom
            }
        })
        return res.status(200).json({
            status:201,
            data: Nurse
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({status:500,message:"an error occurred while trying to create new Nurse"})
    }
}

exports.deleteNurse=async(req,res)=>{
    try{
const {id}=req.params
if(!id){return res.status(400).json({status:400,message:"Invalid  id"})}
const deletedNurse=await prisma.nurse.findFirst(
    {where:{
        id
    }}
)
if(!deletedNurse){
    return res.status(404).json({
        status:404,
        message:"no nurse with that id"
    })
}
const Nurse=await prisma.nurse.delete(
    {where:{
        id
    }}
)
return res.status(204).json({
    status:204,
    data:null
})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({status:500,message:"an error occurred while trying to delete the Nurse"})
    }
}