const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()

exports.getAllPatients=async (req,res)=>{
try{
    const Patients=await prisma.patient.findMany()
    if(!Patients){
        return res.status(404).json({
            status:404,
            message:" no patient were found"
        })
    }
    return res.status(200).json({
        status:200,
        data:Patients
    })
}
catch(err){
return res.status(500).json({status:500,
message:"an error occurred while trying to get the patients"
})
}
}
exports.Addpatient=async(req,res)=>{
    try{
        const {id,nom,prenom,dateDeNaissance,email,password,Location } = req.body
        if(!id || !nom|| !prenom || !dateDeNaissance || !email || !password){
            return res.status(400).json({status:400,message:'missing data'})
        }
        const patient=await prisma.patient.create({
            data:{
                id,nom,prenom,
                dateDeNaissance:new Date(dateDeNaissance)
                ,email,password,Location
            }
        })
        return res.status(200).json({
            status:201,
            data: patient
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({status:500,message:"an error occurred while trying to create new patient"})
    }
}
exports.getPatient=async(req,res)=>{
    try{
        const id=req.params.id *1
    if(!id) {return res.status(400).json({status:400,message:"invalide id"})}
    const patient=await prisma.patient.findFirst({
        where:{
            id
        }
    })
    if(!patient){
        return res.status(404).json({
            status:404,
            message:"patient not found"
        })
    }
    return res.status(200).json({
        status:200,
        data:patient
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred while trying to get patient"
        })
    }
}

exports.deletePatient=async(req,res)=>{
    try{
const id=req.params.id*1
if(!id){return res.status(400).json({status:400,message:"Invalid  id"})}
const deletedPatient=await prisma.patient.findFirst(
    {where:{
        id
    }}
)
if(!deletedPatient){
    return res.status(404).json({
        status:404,
        message:"no nurse with that id"
    })
}
const Patient=await prisma.patient.delete(
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