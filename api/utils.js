const requireUser = (req, res, next) => {
    if(!req.user) {
        res.status(401);
        next({
            message: "Please login"
        });
    }
    next();
}

module.exports = {
    requireUser
}