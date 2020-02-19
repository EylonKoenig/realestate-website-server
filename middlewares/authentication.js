const isUser = (req, res, next) => {
    if (req.cookies.auth && req.cookies.auth.role_id === '2') {
        next();
    } else {
        res.status(401).json({ error: 'Not Authorized' });
    }
}

module.exports = {
    isUser
};