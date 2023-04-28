//  Middleware function

const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    } else {
        res.redirect('/')
    }
}

const isAuth_Admin = (req, res, next) => {
    if(req.session.isAuth){
        next()
    } else {
        res.redirect('/admin/login')
    }
}

module.exports = { isAuth, isAuth_Admin }