const express=require('express')
const app = express();
const cors=require('cors')
const morgan=require('morgan')
const patientRouter=require('./routes/patientRoutes')
const doctorRouter=require('./routes/doctorRoutes')
const nurseRouter=require('./routes/nurseRoutes')
app.use(cors());
app.use(express.json());
app.use(morgan('combined'))
app.get('/api',(req,res)=>{
    res.status(200).json({
        status: 'success',
        data:'tst'
    })
})
app.use('/api/patient',patientRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/nurse',nurseRouter)
module.exports=app;