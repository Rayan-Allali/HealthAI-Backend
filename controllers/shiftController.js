const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()

exports.getAllShifts=async (req,res)=>{
try{
    const Shifts=await prisma.shift.findMany()
    if(!Shifts){
        return res.status(404).json({
            status:404,
            message:" no Shifts were found"
        })
    }
    return res.status(200).json({
        status:200,
        data:Shifts
    })
}
catch(err){
return res.status(500).json({status:500,
message:"an error occurred while trying to get the Shifts"
})
}
}
exports.AddShift=async(req,res)=>{
    try{
        const {numShift,heureDeb,heureFin,Date} = req.body
        if(!numShift|| !heureDeb ||!heureFin ||!Date){
            return res.status(400).json({status:400,message:'missing data'})
        }
        const Shift=await prisma.shift.create({
            data:{
                numShift,heureDeb,heureFin,Date:new Date(Date)
            }
        })
        return res.status(200).json({
            status:201,
            data: Shift
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({status:500,message:"an error occurred while trying to create new Shift"})
    }
}
exports.getShift=async(req,res)=>{
    try{
        const id=req.params.id *1
    if(!id) {return res.status(400).json({status:400,message:"invalide id"})}
    const Shift=await prisma.shift.findFirst({
        where:{
            numShift:id
        }
    })
    if(!Shift){
        return res.status(404).json({
            status:404,
            message:"Shift not found"
        })
    }
    return res.status(200).json({
        status:200,
        data:Shift
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred while trying to get Shift"
        })
    }
}

exports.deleteShift=async(req,res)=>{
    try{
const id=req.params.id*1
if(!id){return res.status(400).json({status:400,message:"Invalid  id"})}
const deletedShift=await prisma.shift.findFirst(
    {where:{
        numShift:id
    }}
)
if(!deletedShift){
    return res.status(404).json({
        status:404,
        message:"no Shift with that id"
    })
}
const Shift=await prisma.shift.delete(
    {where:{
        numShift:id
    }}
)
return res.status(204).json({
    status:204,
    data:null
})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({status:500,message:"an error occurred while trying to delete the Shift"})
    }
}
exports.getShiftsByDate=async(req,res)=>{
    try{
        const Date=new Date(req.params.date)
    if(!Date) {return res.status(400).json({status:400,message:"invalide Date"})}
    const Shifts=await prisma.shift.findMany({
        where:{
            Date
        },
        select:{
            doctors:true,
            date:true,
            heureDebug:true,
            heureFin:true
        }
    })
    if(!Shifts){
        return res.status(404).json({
            status:404,
            message:"no Shift was found"
        })
    }
    return res.status(200).json({
        status:200,
        data:Shifts
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred while trying to get Shifts"
        })
    }
}