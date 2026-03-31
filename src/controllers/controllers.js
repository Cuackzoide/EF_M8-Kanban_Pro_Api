const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Usuario, Tablero, Lista, Tarjeta } = require('../models');
require('dotenv').config();

const viewHome = (req, res) => {
    res.render('home', { title: 'KanbanPro' });
};

const viewLogin = (req, res) => {
    res.render('login', { title: 'KanbanPro' });
};

const viewRegister = (req, res) => {
    res.render('register', { title: 'KanbanPro' });
};

const viewDashboard = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.user.id, {
            include: [{
                model: Tablero,
                as: 'tableros',
                include: [{
                    model: Lista,
                    as: 'listas',
                    include: [{
                        model: Tarjeta,
                        as: 'tarjetas'
                    }]
                }]
            }]
        });

        if (!usuario) {
            return res.redirect('/login');
        }

        const user = usuario.get({ plain: true });

        res.render('dashboard', {
            title: user.name,
            user: user,
            tableros: user.tableros
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al cargar el dashboard");
    }
};

const newCard = async (req, res) => {
    const { boardTitle, listTitle, cardTitle } = req.body;

    try {
        // 1. Buscar o crear el tablero para el usuario autenticado
        let tablero = await Tablero.findOne({
            where: {
                title: boardTitle,
                userId: req.user.id
            }
        });

        if (!tablero) {
            tablero = await Tablero.create({
                title: boardTitle,
                userId: req.user.id
            });
        }

        // 2. Buscar o crear la lista en el tablero
        let lista = await Lista.findOne({
            where: {
                title: listTitle,
                boardId: tablero.id
            }
        });

        if (!lista) {
            lista = await Lista.create({
                title: listTitle,
                boardId: tablero.id
            });
        }

        // 3. Crear la tarjeta en la lista
        await Tarjeta.create({
            title: cardTitle,
            listId: lista.id
        });

        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear la tarjeta");
    }
};

const updateCard = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const card = await Tarjeta.findByPk(id);
        if (!card) {
            return res.status(404).send("Tarjeta no encontrada");
        }
        card.title = title;
        await card.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar la tarjeta");
    }
}
const deleteCard = async (req, res) => {
    const { id } = req.params;
    try {
        const card = await Tarjeta.findByPk(id);
        if (!card) {
            return res.status(404).send("Tarjeta no encontrada");
        }
        await card.destroy();
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar la tarjeta");
    }
}

const updateList = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const list = await Lista.findByPk(id);
        if (!list) {
            return res.status(404).send("Lista no encontrada");
        }
        list.title = title;
        await list.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar la lista");
    }
}

const deleteList = async (req, res) => {
    const { id } = req.params;
    try {
        const list = await Lista.findByPk(id);
        if (!list) {
            return res.status(404).send("Lista no encontrada");
        }
        await list.destroy();
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar la lista");
    }
}

const updateBoard = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const board = await Tablero.findByPk(id);
        if (!board) {
            return res.status(404).send("Tablero no encontrado");
        }
        board.title = title;
        await board.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al actualizar el tablero");
    }
}

const deleteBoard = async (req, res) => {
    const { id } = req.params;
    try {
        const board = await Tablero.findByPk(id);
        if (!board) {
            return res.status(404).send("Tablero no encontrado");
        }
        await board.destroy();
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar el tablero");
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        await Usuario.create({
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
        const user = await Usuario.findOne({ where: { email } })

        const validPassword = await bcrypt.compare(password, user?.password)

        if (!user || !validPassword) {
            throw new Error("Credenciales inválidas")
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.cookie("jwt", token, {
            httpOnly: true,
            // secure: true // sólo funciona cuando nuestro server está sobre HTTPS
            sameSite: "strict"
        })

        res.redirect("/dashboard")
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
module.exports = { viewHome, viewLogin, viewRegister, viewDashboard, newCard, login, register, logout, updateCard, deleteCard, updateList, deleteList, updateBoard, deleteBoard };