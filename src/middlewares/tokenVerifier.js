const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt

    const privatedRoutes = ["/dashboard", "/api/newcard"]

    if (!token && privatedRoutes.includes(req.path)) {
        return res.status(403).redirect("/login")
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE)
        req.user = decoded
        next()
    } catch (error) {
        res.clearCookie("jwt")
        next()
    }
}

module.exports = { verifyToken }