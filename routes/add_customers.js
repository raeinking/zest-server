const axios = require('axios');

module.exports = async (req , res) => {
    if (req.user.roll === 'CallCenter' || req.user.roll === 'Admin' || req.user.roll === 'Owner') {

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    
    const products = year + "-" + month + "-" + date
    
    res.render('add_customers',  {products});
    } else {
        res.render('login');
    }
}