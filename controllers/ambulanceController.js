const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()

exports.getAllAmbulances=async (req,res)=>{
try{
    const Ambullances=await prisma.ambulance.findMany()
    if(!Ambullances){
        return res.status(404).json({
            status:404,
            message:" no Ambullances were found"
        })
    }
    return res.status(200).json({
        status:200,
        data:Ambullances
    })
}
catch(err){
return res.status(500).json({status:500,
message:"an error occurred while trying to get the Ambullances"
})
}
}
exports.AddAmbullance=async(req,res)=>{
    try{
        const {id,Chauffeur} = req.body
        if(!id || !Chauffeur){
            return res.status(400).json({status:400,message:'missing data'})
        }
        const Ambullance=await prisma.ambulance.create({
            data:{
                id,Chauffeur
            }
        })
        return res.status(200).json({
            status:201,
            data: Ambullance
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({status:500,message:"an error occurred while trying to create new Ambullance"})
    }
}
exports.getAmbulance=async(req,res)=>{
    try{
        const id=req.params.id *1
    if(!id) {return res.status(400).json({status:400,message:"invalide id"})}
    const ambulance=await prisma.ambulance.findFirst({
        where:{
            id
        }
    })
    if(!ambulance){
        return res.status(404).json({
            status:404,
            message:"ambulance not found"
        })
    }
    return res.status(200).json({
        status:200,
        data:ambulance
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred while trying to get ambulance"
        })
    }
}