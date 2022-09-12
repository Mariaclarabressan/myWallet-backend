import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import joi from 'joi';
import mongodb from 'mongodb';
import login from './Rotas/login.js';
import extratoValores from './Rotas/extratoValores.js'

const servidor = express();

dotenv.config();
servidor.use(cors());
servidor.use(express.json());

servidor.use(extratoValores);
servidor.use(login);


const PORTA = process.env.PORTA || 5001

servidor.listen(PORTA, () => {
    console.log("Entrou no servidor!")
})



