const {PrismaClient} =require('@prisma/client')
const {data} =require('./../data.js')
const prisma= new PrismaClient()
async function main(){
    await prisma.shift.createMany({data})
}
main().catch(e=>{
    console.error(e)
    process.exit(1)
})
.finally(async()=>{
    await prisma.$disconnect()
})