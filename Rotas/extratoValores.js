import { Router } from "express";
import { EntradaValor,  MostrarTransacoes} from "../Cadastro/dadosExtrato.js"

const rota = Router();

rota.get('/transacoes', MostrarTransacoes)

rota.post('/transacoes' , EntradaValor)

export default rota;
