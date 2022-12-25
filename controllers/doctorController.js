const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()

exports.getAllDoctors=async (req,res)=>{
try{
    const Doctors=await prisma.doctor.findMany()
    if(!Doctors){
        return res.status(404).json({
            status:404,
            message:" no doctor were found"
        })
    }
    return res.status(200).json({
        status:200,
        data:Doctors
    })
}
catch(err){
return res.status(500).json({status:500,
message:"an error occurred while trying to get the doctors"
})
}
}
exports.AddDoctor=async(req,res)=>{
    try{
        const {id,nom,prenom,adress} = req.body
        if(!id || !nom|| !prenom || !adress){
            return res.status(400).json({status:400,message:'missing data'})
        }
        const doctor=await prisma.doctor.create({
            data:{
                id,nom,prenom,adress
            }
        })
        return res.status(200).json({
            status:201,
            data: doctor
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({status:500,message:"an error occurred while trying to create new doctor"})
    }
}
exports.getDoctor=async(req,res)=>{
    try{
        const id=req.params.id *1
    if(!id) {return res.status(400).json({status:400,message:"invalide id"})}
    const doctor=await prisma.doctor.findFirst({
        where:{
            id
        }
    })
    if(!doctor){
        return res.status(404).json({
            status:404,
            message:"doctor not found"
        })
    }
    return res.status(200).json({
        status:200,
        data:doctor
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred while trying to get doctor"
        })
    }
}

exports.deleteDoctor=async(req,res)=>{
    try{
const id=req.params.id*1
if(!id){return res.status(400).json({status:400,message:"Invalid  id"})}
const deleteddoctor=await prisma.doctor.findFirst(
    {where:{
        id
    }}
)
if(!deleteddoctor){
    return res.status(404).json({
        status:404,
        message:"no doctor with that id"
    })
}
const doctor=await prisma.doctor.delete(
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
        return res.status(500).json({status:500,message:"an error occurred while trying to delete the doctor"})
    }
}