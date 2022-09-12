import { Router } from "express";
import { loginUsuario, cadastroUsuario } from "../Cadastro/dadosUsuario.js";


const rota = Router();

rota.post('/login' , loginUsuario)

rota.post('/cadastro', cadastroUsuario)

export default rota;

