const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb+srv://pandu160207_db_user:x6tsE0FDai8TtETK@khyathi.zlgicuc.mongodb.net/firstcart?retryWrites=true&w=majority&appName=Khyathi')
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String
});
const userSchema = new mongoose.Schema({

    username: String,

    email: String,

    password: String,

    phone: String,

    address: String,

    city: String,

    district: String,

    pincode: String,

    country: String
});
const orderSchema = new mongoose.Schema({

    email: String,

    products: Array,

    paymentMethod: String,

    orderDate: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);
const Product = mongoose.model('Product', productSchema);
app.get('/add-product', async (req, res) => {

    const product = new Product({
        name: "Shoes",
        price: 50,
       image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    });

    await product.save();

    res.send("Product Added Successfully");
});
app.get('/products', async (req, res) => {

    const products = await Product.find();

    res.json(products);

});
app.get('/add-watch', async (req, res) => {

    const product = new Product({

        name: "Smart Watch",

        price: 199,

        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"

    });

    await product.save();

    res.send("Watch Added");
});
app.get('/add-phone', async (req, res) => {

    const product = new Product({

        name: "iPhone 15",

        price: 999,

        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"

    });

    await product.save();

    res.send("Phone Added");
});
app.get('/add-headphones', async (req, res) => {

    const product = new Product({

        name: "Headphones",

        price: 149,

        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"

    });

    await product.save();

    res.send("Headphones Added");
});
app.get('/add-laptop', async (req, res) => {

    const product = new Product({

        name: "Laptop",

        price: 1200,

        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"

    });

    await product.save();

    res.send("Laptop Added");
});
app.get('/add-hoodie', async (req, res) => {

    const product = new Product({

        name: "Hoodie",

        price: 59,

        image: "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg"

    });

    await product.save();

    res.send("Hoodie Added");
});
app.get('/add-tshirt', async (req, res) => {

    const product = new Product({

        name: "T-Shirt",

        price: 35,

        image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg"

    });

    await product.save();

    res.send("T-Shirt Added");
});
app.get('/add-jeans', async (req, res) => {

    const product = new Product({

        name: "Jeans",

        price: 80,

        image: "https://images.pexels.com/photos/2343661/pexels-photo-2343661.jpeg"

    });

    await product.save();

    res.send("Jeans Added");
});
app.get('/add-saree', async (req, res) => {

    const product = new Product({

        name: "Saree",

        price: 120,

        image: "https://images.pexels.com/photos/9775878/pexels-photo-9775878.jpeg"

    });

    await product.save();

    res.send("Saree Added");
});
app.post('/register', async (req, res) => {

    const user = new User(req.body);

    await user.save();

    res.send('Registration Successful');
});
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.post('/login', async (req, res) => {

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(user) {
        res.send('Login Successful');
    } else {
        res.send('Invalid Email or Password');
    }

});
app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({
        email,
        password
    });

    if(user) {

        res.send('Login Successful');
    }

    else {

        res.send('Invalid Credentials');
    }
});



app.post('/save-profile', async (req, res) => {

    const {
        email,
        phone,
        address,
        city,
        district,
        pincode,
        country
    } = req.body;

    await User.updateOne(

        { email: email },

        {
            phone,
            address,
            city,
            district,
            pincode,
            country
        }
    );

    res.send('Address Saved Successfully');
});
app.post('/place-order', async (req, res) => {

    const {
        email,
        cart,
        paymentMethod
    } = req.body;

    const order = new Order({

        email,

        products: cart,

        paymentMethod
    });

    await order.save();

    res.send('Order Placed Successfully');
});