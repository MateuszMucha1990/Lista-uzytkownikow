module.exports = function(req, res, next) {
    res.locals.osoba = req.session.osoba
    next();
}