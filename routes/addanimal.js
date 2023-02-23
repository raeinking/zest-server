module.exports = (req, res) => {
    if ( req.user.roll === 'Admin' || req.user.roll === 'Owner') {
        res.render('add_animal')
    } else {
        res.render('login')
    }
}