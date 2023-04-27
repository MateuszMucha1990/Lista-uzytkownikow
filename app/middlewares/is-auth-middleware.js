module.exports = function(req, res, next) {
   if (!req.session.osoba) {
    return res.redirect('/zaloguj');
   }
    next();
}