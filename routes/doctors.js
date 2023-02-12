const axios = require('axios')

module.exports = async function(req, res) {
    const products = await axios.get('http://localhost:5000/api/doc')
    res.render('doctors' , {products : products.data})
}