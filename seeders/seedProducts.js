const productNames = ['Kaos Hitam Berlogo','Kaos Putih Medium Size','Kaos Wanita Berlogo']
const productPrices= [150000,200000,250000]
const productGenders= [['male,female'],['male','female'],['male']]
const productSizes = [['S','L','M','XL'],['M'],['S','M','XL']]

const { getDataBase, connectMongoDb } = require('../config/mongoDb')

async function seedUsers() {
    try {
        const docs = []
        productNames.forEach((e,i)=>{
            docs.push(
                {
                    name:e,
                    price:productPrices[i],
                    genders:productGenders[i],
                    sizes:productSizes[i]
                }
            )
        })
        const db = getDataBase()
        const products = await db
            .collection('products')
            .insertMany(docs)
        console.log(products);
    } catch (error) {
        console.log(error);
    } finally{
        process.exit()
    }
}
connectMongoDb()
    .then(db => {
        seedUsers()
    })
    