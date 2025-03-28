const User = require('../models/User');
const bcrypt = require('bcryptjs');
const ApiController = {
    getAllUsers: async (req, res) => {
        try {
            // Establecer los headers en la respuesta
            res.set({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': req.headers['authorization'] || '', // Usamos el token de la cabecera Authorization
            });

            const users = await User.getAll();
            res.json({ success: true, data: users });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    },

    getUser: async(req, res) => {
        try {
            // Establecer los headers en la respuesta
            res.set({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': req.headers['authorization'] || '', // Usamos el token de la cabecera Authorization
            });

            const user = await User.getById(req.params.id);
            res.json({ success: true, data: user });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error del servidor');
        }
    },
   
    checkLogin: async (req, res) => {
        try {
            res.set({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': req.headers['authorization'] || '',
            });
    
            // 1️⃣ Obtener el usuario por email
            const user = await User.loginCheck(req.body.email);
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
    
            // 2️⃣ Verificar la contraseña con bcrypt
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
    
            // 3️⃣ Generar token JWT
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            res.json({ success: true, token });
        } catch (error) {
            console.error('❌ Error en checkLogin:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    },

    createUser: async (req, res) => {
        try {
            // Establecer los headers en la respuesta
            res.set({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': req.headers['authorization'] || '', // Usamos el token de la cabecera Authorization
            });

            const newUserId = await User.create(req.body);
            res.status(201).json({ 
                success: true, 
                message: 'User created',
                id: newUserId
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error creating user' });
        }
    }
};

module.exports = ApiController;
