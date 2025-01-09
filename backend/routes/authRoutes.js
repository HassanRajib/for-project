import express from 'express'
import { conTOData } from '../lib/db.js';
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

const router = express.Router()

router.post('/', async (req, res)=> {
    const {username, email, password} = req.body;
    try {
        const db = await conTOData()
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if (rows.length > 0) {
            return res.status(409).json({message: "you r a not new"})
        }

        const hashPass = await bcrypt.hash(password, 10)
        await db.query("INSERT INTO users (uname, email, password) VALUES (?, ?, ?)",
            [username, email, hashPass])

            res.status(201).json({message: "WelCome Home"})
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/Login', async (req, res)=> {
    const {email, password} = req.body;
    try {
        const db = await conTOData()
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if (rows.length === 0) {
            return res.status(404).json({message: "you r not"})
        }

        const isMatch = await bcrypt.compare(password, rows[0].password)
        if(!isMatch) {
            return res.status(401).json({message: "wrong password"})
        }
        const token = JWT.sign({id: rows[0].id}, process.env.JWT_KEY, {expiresIn: '3h'})

            res.status(201).json({token: token})
    } catch (err) {
        res.status(500).json(err)
    }
})

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split('')[1];
        if (!token) {
            return res.status(403).json({message: 'ntp'})
        }
        const decoded = JWT.verify(token, process.env.JWT_KEY)
        req.userId = decoded.id;
        next()
    } catch (err) {
        return res.status(500).json({message: "server error"})
    }
}

router.get('/landing', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase()
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.userId])
        if(rows.length === 0) {
            return res.status(404).json({message: "une"})
        }

        return res.status(201).json({user: rows[0]})
    } catch (err) {
        return res.status(500).json({message: "server error"})
    }
})

export default router