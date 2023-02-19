const axios = require('axios');

module.exports = async (req , res) => {
    const products = await axios.get(`http://localhost:5000/api/reklam/`)
    res.render('add_customers',  {products: products.data});
}