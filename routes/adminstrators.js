const axios = require('axios')

module.exports = async function(req, res) {
    if (req.user.roll === 'Admin') {
        const products = await axios.get(`http://localhost:5000/api/user/getall`)
        res.render("adminstrators",{ products : products.data })
    } else {
        res.render("Login")
    }
}