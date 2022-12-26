const {PrismaClient} =require('@prisma/client')
const prisma= new PrismaClient()

const data=[
    
  ]
  
async function main(){
    await prisma.doctor.createMany({data:
        [
            {
              id: 1,
              nom: "Andrey",
              email: "ainsole0@mit.edu",
              password: "wNJGX8P6k",
              prenom: "Walsh",
              specialite: "Insole",
              adress: "El Cerrito"
            },
            {
              id: 2,
              nom: "Kippie",
              email: "kbladder1@ameblo.jp",
              password: "WZ3H6Qi2SeH",
              prenom: "Woodley",
              specialite: "Bladder",
              adress: "Ansan-si"
            },
            {
              id: 3,
              nom: "Mathe",
              email: "mjouen2@example.com",
              password: "RHpVZPvu3",
              prenom: "Peegrem",
              specialite: "Jouen",
              adress: "Gaolong"
            },
            {
              id: 4,
              nom: "Clarita",
              email: "ccrosby3@alexa.com",
              password: "g7jl7Cgxd1kG",
              prenom: "De Maria",
              specialite: "Crosby",
              adress: "Bosanski Novi"
            },
            {
              id: 5,
              nom: "Oswald",
              email: "ogulvin4@google.ru",
              password: "0ouvqWMcBfqY",
              prenom: "Grinval",
              specialite: "Gulvin",
              adress: "Linköping"
            },
            {
              id: 6,
              nom: "Dukey",
              email: "dpieper5@independent.co.uk",
              password: "WbGqVOl",
              prenom: "Romney",
              specialite: "Pieper",
              adress: "Khorostkiv"
            },
            {
              id: 7,
              nom: "Nerti",
              email: "njeaffreson6@admin.ch",
              password: "fQ3Qhgw5Rv",
              prenom: "Skokoe",
              specialite: "Jeaffreson",
              adress: "Kapuan"
            },
            {
              id: 8,
              nom: "Enid",
              email: "etyce7@youtu.be",
              password: "4fH81JE",
              prenom: "Shinefield",
              specialite: "Tyce",
              adress: "Azueira"
            },
            {
              id: 9,
              nom: "Susan",
              email: "sperceval8@cyberchimps.com",
              password: "DGl5kh1mw",
              prenom: "Thiem",
              specialite: "Perceval",
              adress: "Bebedahan"
            },
            {
              id: 10,
              nom: "Marthe",
              email: "mspieght9@edublogs.org",
              password: "OWSDKmzmtzeL",
              prenom: "Maplethorp",
              specialite: "Spieght",
              adress: "Tomakomai"
            },
            {
              id: 11,
              nom: "Shawna",
              email: "slortza@networkadvertising.org",
              password: "WXm3XFTKD8r",
              prenom: "Woolway",
              specialite: "Lortz",
              adress: "Tugu"
            },
            {
              id: 12,
              nom: "Elbert",
              email: "etortoishellb@webs.com",
              password: "nP6fIyzSKo",
              prenom: "Scannell",
              specialite: "Tortoishell",
              adress: "Zhangyelu"
            }
          ]
          
        
    })
      }

main().catch(e=>{
    console.error(e)
    process.exit(1)
})
.finally(async()=>{
    await prisma.$disconnect()
})