const axios = require('axios')

module.exports = async function(req, res) {
    const products = await axios.get(`http://localhost:5000/api/user/getall`)
    if (req.user.roll === 'Admin') {
        res.render("adminstrators",{ products : products.data })
    } else {
        res.render("Login")
    }
}