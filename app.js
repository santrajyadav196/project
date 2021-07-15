const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/inventory', async (req, res) => {
    const products = await Inventory.find({});
    res.render('inventory/index', { products });
});


app.get('/inventory/new', (req, res) => {
    res.render('inventory/new')
});

app.post('/inventory', async (req, res) => {
    const product = new Inventory(req.body.inventory);
    await product.save();
    res.redirect(`/inventory/${product._id}`);
})

app.get('/inventory/:id', async (req, res) => {
    const product = await Inventory.findById(req.params.id);
    res.render('inventory/show', { product });
});

app.get('/inventory/:id/edit', async (req, res) => {
    const product = await Inventory.findById(req.params.id);
    res.render('inventory/edit', { product });
});

app.put('/inventory/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Inventory.findByIdAndUpdate(id, { ...req.body.inventory });
    res.redirect(`/inventory/${product._id}`);

})

app.delete('/inventory/:id', async (req, res) => {
    const { id } = req.params;
    await Inventory.findByIdAndDelete(id);
    res.redirect('/inventory');
})



app.listen(3000, () => {
    console.log('Srver is running on Port 3000')
});