const axios = require('axios')

module.exports = async function(req, res) {
    if (req.user.roll === 'CallCenter' || req.user.roll === 'Admin' || req.user.roll === 'Owner') {
    const products = await axios.get(`http://localhost:5000/api/users/all`)
    res.render("customers",  { products : products.data })
    } else {
        res.render("login")
    }
}