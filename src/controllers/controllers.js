const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

const viewHome = (req, res) => {
    res.render('home');
};

const viewLogin = (req, res) => {
    res.render('login');
};

const viewRegister = (req, res) => {
    res.render('register');
};

const viewDashboard = async (req, res) => {
};

const newCard = async (req, res) => {
};


const register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        await User.create({
            name,
            email,
            password
        })

        res.redirect("/login")
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}


const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ where: { email } })

        const validPassword = await bcrypt.compare(password, user?.password)

        if (!user || !validPassword) {
            throw new Error("Credenciales inválidas")
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
        }, process.env.TOKEN_SIGNATURE, {
            expiresIn: "1h"
        })

        res.cookie("jwt", token, {
            httpOnly: true,
            // secure: true // sólo funciona cuando nuestro server está sobre HTTPS
            sameSite: "strict"
        })

        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}

const logout = (req, res) => {
    res.clearCookie("jwt")
    res.redirect("/")
}
module.exports = { viewHome, viewLogin, viewRegister, viewDashboard, newCard, login, register };