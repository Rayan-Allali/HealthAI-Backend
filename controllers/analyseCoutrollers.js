const {PrismaClient}=require('@prisma/client')
const prisma=new PrismaClient()

exports.getAllAnalysesOfType=async(req,res)=>{
const {type}=req.params
if(!type){return res.status(400).json({status:400,message:"Invalid type"})}

const Analyses=await prisma.analyse.findMany({
    where:{
        type
    }
})
if(!Analyses){return res.status(404).json({status:404,message:"Analyses not found"})}
return res.status(200).json({
    status:200,
    data:Analyses
})
}
exports.addAnalyse=async(req,res)=>{
try{
    const {type,img,date}=req.body
    if(!type){
        return res.status(400),json({
            status:400,
            message:"invalid type"
        })
    }
    const analyse=await prisma.analyse.create({
        type,
        img,
        date:Date.now(),
    })
    res.status(201).json({status:201,data:analyse})
}
catch(err){
    return res.status(500).json({
        status:500,
        message:"an error occurred"
    })
}
}
exports.getAnalyse=async(req,res)=>{
    try{
        const id=req.params.id*1
    if(!id){
        return res.status(400).json({
            status:400,
            message:"invalide id"
        })
    }
    const analyse=await prisma.analyse.findFirst({
        where:{
            id
        }
    })
    if(!analyse){
        return res.status(404).json({
            status:404,
            message:"no analyse with that id was found"
        })
    }
   return res.status(200).json({
        status:200,
        data:analyse
    })
    }
    catch(err){
        console.error(err)
        res.status(500).json({status:500,message:"an error occurred"})
    }
}