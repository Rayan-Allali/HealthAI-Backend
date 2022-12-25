const app=require('./app')

const PORT=process.env.PORT || 8000
app.listen(8000,()=>{
    console.log(`listening in port ${PORT}`)
})