const {PrismaClient} =require('@prisma/client')
const prisma =new PrismaClient()
const {promisify}=require('util')
const jwt=require('jsonwebtoken')

exports.sendResponse=async(req,res)=>{
    try{
        const token =req.headers.authorization.split(' ')[1]
        const decoded= await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)
   const doctor=await prisma.doctor.findFirst({
    where:{
        id:decoded.id
    }
   })
        const {text}=req.body
    if(!text){
        return res.status(400).json({status:400,message:"missing data"})
    }
    const response=await prisma.response.create({
        data:{
            text,
            DoctorId:doctor.id
        }
    })
   return res.status(200).json({status:200,data:response})
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:'an error occurred'
        })
    }
}

exports.sendRequest=async(req,res)=>{
    try{
        const token=req.authorization.split(' ')[1]
        const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)
        const patient=await prisma.patient.findFirst({
            where:{
                id:decoded.id
            }
        })
        const {question}=req.body
    if(!question){
        return res.status(400).json({status:400,message:"missing data"})
    }
    const request=await prisma.request.create({
        data:{
            question,
            patientId:patient.id
        }
    })
    res.status(200).json({status:200,data:request})
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:'an error occurred'
        })
    }
}

exports.getAllResponseForPatient=async(req,res)=>{
   try{
    const token=req.headers.authorization.split(' ')[1]

    const decoded= await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)
   const patient=await prisma.patient.findFirst({
    where:{
        id:decoded.id
    }
   })
   const responses=await prisma.response.findMany({
    where:{
        patientId:patient.id
    }
   })
   if(!responses){
    return res.status(200).json({
        status:200,
        message:"there is no response yet"
    })
    return res.status(200).json({
        status:200,
        data:responses
    })
   }
   } catch(err){
    return res.status(500).json({status:500,message:"an error occured"})
   }
}

exports.getAllRequestForDoctor=async(req,res)=>{
    try{
     const token=req.headers.authorization.split(' ')[1]
 
     const decoded= await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)
    const doctor=await prisma.doctor.findFirst({
     where:{
         id:decoded.id
     }
    })
    const requestes=await prisma.request.findMany({
     where:{
        DoctorId:doctor.id
     }
    })
    if(!requestes){
     return res.status(200).json({
         status:200,
         message:"there is no requestes for now"
     })
     return res.status(200).json({
         status:200,
         data:requestes
     })
    }
    } catch(err){
     return res.status(500).json({status:500,message:"an error occured"})
    }
 }
 exports.getRequest=async(req,res)=>{
    try{
        const id =req.params.id *1
    if(!id){return res.status(400).json({status:400,message:"invalide id"})}
    const request=await prisma.request.findFirst({
        where:{
            id
        }
    })
    if(!request){return res.status(404).json({status:404,message:"no request with that id"})}
    return res.status(200).json({status:200,data:request})
    }
    catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"an error occurred"})
    }
 }


 exports.getRespond=async(req,res)=>{
    try{
        const id =req.params.id *1
    if(!id){return res.status(400).json({status:400,message:"invalide id"})}
    const Respond=await prisma.response.findFirst({
        where:{
            id
        }
    })
    if(!Respond){return res.status(404).json({status:404,message:"no Respond with that id"})}
    return res.status(200).json({status:200,data:Respond})
    }
    catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"an error occurred"})
    }
 }