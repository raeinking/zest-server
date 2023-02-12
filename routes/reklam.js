const axios = require('axios')


module.exports = async function(req, res) {
    const products = await axios.get(`http://localhost:5000/api/reklam/`)
    res.render("reklam", {products: products.data})
}