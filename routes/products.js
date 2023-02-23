const axios = require('axios')

module.exports = async function(req, res) {
    if ( req.user.roll === 'Admin' || req.user.roll === 'Owner') {
    const products = await axios.get(`http://localhost:5000/api/products/`)
    res.render("products", { products : products.data } )
    } else {
        res.render("login")
    }
}