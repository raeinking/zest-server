const axios = require('axios')

module.exports = async function(req, res) {
    res.render('edit_Fbrand', {products: products.data})
}