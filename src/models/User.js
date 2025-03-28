const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const { get } = require('../routes/api');

const User = {
    getAll: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM users');
            return rows;
        } catch (error) {
            console.error('❌ Error en getAll:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('❌ Error en getById:', error);
            throw error;
        }
    },

    loginCheck: async (email) => { // ⚠️ Solo recibimos el email para obtener el hash de la DB
        try {
            const [rows] = await pool.query(
                'SELECT id, email, password FROM users WHERE email = ?', 
                [email]
            );
            return rows.length > 0 ? rows[0] : null; // Si no hay usuario, retorna null
        } catch (error) {
            console.error('❌ Error en loginCheck:', error);
            throw error;
        }
    },
    

    create: async (userData) => {
        try {
            // Generar un hash de la contraseña con un "salt" de 10 rondas
            const hashedPassword = await bcrypt.hash(userData.password, 10);
    
            const [result] = await pool.query(
                'INSERT INTO users (name, email, age, password) VALUES (?, ?, ?, ?)',
                [userData.name, userData.email, userData.age, hashedPassword] // Guardar la contraseña encriptada
            );
    
            return result.insertId;
        } catch (error) {
            console.error('❌ Error en create:', error);
            throw error;
        }
    }
};

module.exports = User;
