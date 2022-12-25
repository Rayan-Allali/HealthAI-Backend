const {PrismaClient}=require('@prisma/client')
const prisma=new PrismaClient()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
 /* password=await bcrypt.hash(password,12) */
exports.signUp=async(req,res)=>{
    try{
        var {id,nom,prenom,dateDeNaissance,email,password,Location } = req.body
        if(!id || !nom|| !prenom || !dateDeNaissance || !email || !password ||!Location){
            return res.status(400).json({status:400,message:'missing data'})
        }
        const token=jwt.sign({id},process.env.JWT_SECRET_KEY,{
            expiresIn:process.env.JWT_EXPIRES_IN,
          })
     password=await bcrypt.hash(password,12)

        const newPatient = await prisma.patient.create({
            data:{
                id,nom,prenom,
                dateDeNaissance:new Date(dateDeNaissance)
                ,email,password,Location
            }
        })
        return res.status(201).json({
            status:201,
            token,
            data:newPatient
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({status:500,message:err})
    }
}
exports.signIn=async(req,res)=>{
try{
const {id,email,password}=req.body
if(!email || !password || !id) {return res.status(400).json({status:400,message:"missing data"})}
const patient=await prisma.patient.findFirst({
    where:{
        id:id*1,
        email
    }
})
if(!patient){return res.status(400).json({status:400,message:"id or email or password wrong"})}

const match = await bcrypt.compare(password,patient.password);
if(!match){return res.status(400).json({status:400,message:"id or email or password wrong"})}
const token=jwt.sign({id},process.env.JWT_SECRET_KEY,{
    expiresIn:process.env.JWT_EXPIRES_IN,
  })
return res.status(200).json({
    status:200,
    token
})
}
catch(err){
    console.error(err)
    return res.status(500).json({status:500,message:"an error occurred"})
}
}