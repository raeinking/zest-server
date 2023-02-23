module.exports = (req, res) => {
    if (req.user.roll === 'Admin') {
        res.render('add_admin')
    } else {
        alert('You are not authorized to access this page')
    }
}