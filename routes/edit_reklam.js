const axios = require('axios')

module.exports = async function(req, res) {
    res.render('edit_reklam', {products: products.data})
}