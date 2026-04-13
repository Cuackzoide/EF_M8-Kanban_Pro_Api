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
            order: [
                [{ model: Tablero, as: 'tableros' }, 'id', 'ASC'],
                [{ model: Tablero, as: 'tableros' }, { model: Lista, as: 'listas' }, 'id', 'ASC'],
                [{ model: Tablero, as: 'tableros' }, { model: Lista, as: 'listas' }, { model: Tarjeta, as: 'tarjetas' }, 'id', 'ASC']
            ],
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

        // Añadir referencias de navegación entre listas
        user.tableros.forEach(tablero => {
            tablero.listas.forEach((lista, index) => {
                lista.prevListId = index > 0 ? tablero.listas[index - 1].id : null;
                lista.nextListId = index < tablero.listas.length - 1 ? tablero.listas[index + 1].id : null;
                
                // Lógica de bordes clásica de Kanban:
                // Flecha retroceder desactivada en inicio (Asignado)
                lista.disableBack = index === 0;
                // Flecha avanzar desactivada en el último (Finalizado)
                lista.disableNext = index === tablero.listas.length - 1;
            });
        });

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

const newBoard = async (req, res) => {
    const { title } = req.body;
    try {
        const tablero = await Tablero.create({
            title: title,
            userId: req.user.id
        });
        
        await Lista.bulkCreate([
            { title: 'Asignado', boardId: tablero.id },
            { title: 'En Proceso', boardId: tablero.id },
            { title: 'Finalizado', boardId: tablero.id }
        ]);
        
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear el tablero");
    }
};

const newCard = async (req, res) => {
    const { listId, cardTitle } = req.body;

    try {
        await Tarjeta.create({
            title: cardTitle,
            listId: listId
        });

        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear la tarjeta");
    }
};

const updateCard = async (req, res) => {
    const { id } = req.params;
    const { title, listId } = req.body;
    try {
        const card = await Tarjeta.findByPk(id);
        if (!card) {
            return res.status(404).send("Tarjeta no encontrada");
        }
        if (title) card.title = title;
        if (listId) card.listId = listId;
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
module.exports = { viewHome, viewLogin, viewRegister, viewDashboard, newBoard, newCard, login, register, logout, updateCard, deleteCard, updateBoard, deleteBoard };