import express from 'express'
import { conTOData } from '../lib/db.js';
import bctypt from 'bcrypt'
import JWT from 'jsonwebtoken'

const router = express.Router()

router.post('/', async (req, res)=> {
    const {username, email, password} = req.body;
    try {
        const db = await conTOData()
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])
        if (rows.lenght > 0) {
            return res.status(409).json({message: "you r a not new"})
        }

        const hashPass = await bctypt.hash(password, 10)
        await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
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
        if (rows.lenght === 0) {
            return res.status(404).json({message: "you r not"})
        }

        const isMatch = await bctypt.compare(password, rows[0].password)
        if(!isMatch) {
            return res.status(401).json({message: "wrong password"})
        }
        const token = JWT.sign({id: rows[0].id}, process.env.JWT_KEY, {expiresIn: '3h'})

            res.status(201).json({token: token})
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router