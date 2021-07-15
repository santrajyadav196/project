const mongoose = require('mongoose');
const Inventory = require('./models/inventory');

mongoose.connect('mongodb://localhost:27017/inventory', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then((data) => {
        console.log('Connection is open!!')
    })
    .catch((err) => {
        console.log('Oh no error', err)
    })

const seedDB = async () => {
    await Inventory.deleteMany({});
    const invent = new Inventory({
        name: 'santraj',
        email: "santrajyadav196@gmail.com",
        sku: "ASBC5",
        description: "I am good",
        price: 50,
        stock: 75
    });
    await invent.save();
}

// seedDB();

const seedProducts = [
    {
        name: 'santraaz',
        email: "santrazyadav196@gmail.com",
        sku: "ASdC5",
        description: "I am very good",
        price: 60,
        stock: 80
    },
    {
        name: 'raj',
        email: "rajyadav196@gmail.com",
        sku: "ASjs5",
        description: "I am not good",
        price: 40,
        stock: 90
    },
    {
        name: 'santu',
        email: "santuyadav196@gmail.com",
        sku: "AwBC5",
        description: "I am not well",
        price: 56,
        stock: 88
    }
]

Inventory.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })