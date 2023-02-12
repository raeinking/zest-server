const axios = require('axios')


module.exports = async (req, res) => {
    res.render('edit_admin',  { products: products.data } )
}