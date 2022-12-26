const {PrismaClient}=require('@prisma/client')
const prisma=new PrismaClient()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {promisify}=require('util')
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

exports.signUpNurse=async(req,res)=>{
    try{
        var {id ,nom ,prenom,email,password} = req.body
        if(!id || !nom|| !prenom ||  !email || !password ){
            return res.status(400).json({status:400,message:'missing data'})
        }
        const token=jwt.sign({id},process.env.JWT_SECRET_KEY,{
            expiresIn:process.env.JWT_EXPIRES_IN,
          })
     password=await bcrypt.hash(password,12)

        const newNurse = await prisma.nurse.create({
            data:{
                id,nom,prenom,email,password
            }
        })
        return res.status(201).json({
            status:201,
            token,
            data:newNurse
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({status:500,message:'an error occurred'})
    }
}
exports.signInNurse=async(req,res)=>{
try{
const {id,email,password}=req.body
if(!email || !password || !id) {return res.status(400).json({status:400,message:"missing data"})}
const nurse=await prisma.nurse.findFirst({
    where:{
        id:id*1,
        email
    }
})
if(!nurse){return res.status(400).json({status:400,message:"id or email or password wrong"})}

const match = await bcrypt.compare(password,nurse.password);
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


exports.signUpDoctor=async(req,res)=>{
    try{
        var {id ,nom ,prenom,email,password,adress,specialite} = req.body
        if(!id || !nom|| !prenom ||  !email || !password || !specialite || !adress){
            return res.status(400).json({status:400,message:'missing data'})
        }
        const token=jwt.sign({id},process.env.JWT_SECRET_KEY,{
            expiresIn:process.env.JWT_EXPIRES_IN,
          })
     password=await bcrypt.hash(password,12)

        const newDoctor = await prisma.doctor.create({
            data:{
                id,nom,prenom,email,password,adress,specialite
            }
        })
        return res.status(201).json({
            status:201,
            token,
            data:newDoctor
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({status:500,message:'an error occurred'})
    }
}

exports.signInDoctor=async(req,res)=>{
try{
const {id,email,password}=req.body
if(!email || !password || !id) {return res.status(400).json({status:400,message:"missing data"})}
const doctor=await prisma.doctor.findFirst({
    where:{
        id:id*1,
        email
    }
})
if(!doctor){return res.status(400).json({status:400,message:"id or email or password wrong"})}

const match = await bcrypt.compare(password,doctor.password);
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


exports.signUpAmbulance=async(req,res)=>{
    try{
        var {id ,chaffeurNom,email,password} = req.body
        if(!id || !nom|| !prenom ||  !email || !password || !chaffeurNom ){
            return res.status(400).json({status:400,message:'missing data'})
        }
        const token=jwt.sign({id},process.env.JWT_SECRET_KEY,{
            expiresIn:process.env.JWT_EXPIRES_IN,
          })
     password=await bcrypt.hash(password,12)

        const newAmbulance = await prisma.ambulance.create({
            data:{
                id,chaffeurNom,email,password
            }
        })
        return res.status(201).json({
            status:201,
            token,
            data:newAmbulance
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({status:500,message:'an error occurred'})
    }
}

exports.signInAmbulance=async(req,res)=>{
try{
const {id,email,password}=req.body
if(!email || !password || !id) {return res.status(400).json({status:400,message:"missing data"})}
const ambulance=await prisma.ambulance.findFirst({
    where:{
        id:id*1,
        email
    }
})
if(!ambulance){return res.status(400).json({status:400,message:"id or email or password wrong"})}

const match = await bcrypt.compare(password,ambulance.password);
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


exports.protectDoctor=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return res.status(401).json({status:401,message:"you are not logged in "})
    }
   const decoded= await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)
   const doctor=await prisma.doctor.findFirst({
    where:{
        id:decoded.id
    }
   })
   if(!doctor){
    return res.status(401).json({status:401,message:"you are not authenticated to access this"})
   }
   req.doctor=doctor
    next()
}

exports.protectNurse=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return res.status(401).json({status:401,message:"you are not logged in "})
    }
   const decoded= await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)
   const nurse=await prisma.nurse.findFirst({
    where:{
        id:decoded.id
    }
   })
   if(!nurse){
    return res.status(401).json({status:401,message:"the patient belonging to this token does no longer exsist"})
   }
   req.nurse=nurse
    next()
}

exports.protectPatient=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return res.status(401).json({status:401,message:"you are not logged in "})
    }
   const decoded= await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)
   const patient=await prisma.patient.findFirst({
    where:{
        id:decoded.id
    }
   })
   if(!patient){
    return res.status(401).json({status:401,message:"the patient belonging to this token does no longer exsist"})
   }
   req.patient=patient
    next()
}

exports.protectAmbulance=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return res.status(401).json({status:401,message:"you are not logged in "})
    }
   const decoded= await promisify(jwt.verify)(token,process.env.JWT_SECRET_KEY)
   const ambulance=await prisma.ambulance.findFirst({
    where:{
        id:decoded.id
    }
   })
   if(!ambulance){
    return res.status(401).json({status:401,message:"you are not authorised to access this"})
   }
   req.ambulance=ambulance
    next()
}