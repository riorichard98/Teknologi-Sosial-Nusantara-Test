const productNames = ['Kaos Hitam Berlogo','Kaos Putih Medium Size','Kaos Wanita Berlogo']
const productPrices= [150000,200000,250000]
const productGenders= [['Male,Female'],['Male','Female'],['Female']]
const productSizes = [['S','L','M','XL'],['M'],['S','M','XL']]
const imageUrl = ['https://cf.shopee.co.id/file/e7e4fc1cd889153622715774b0193f54',
'https://media.karousell.com/media/photos/products/2021/12/31/kaos_putih_polos_1640963086_0c21456e.jpg']

const { getDataBase, connectMongoDb } = require('../config/mongoDb')

async function seedUsers() {
    try {
        const docs = []
        productNames.forEach((e,i)=>{
            docs.push(
                {
                    name:e,
                    price:productPrices[i],
                    availableGenders:productGenders[i],
                    availableSizes:productSizes[i]
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
    