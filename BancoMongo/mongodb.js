import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

let db = null;

const mongo_conexao = new MongoClient(process.env.MONGO_CONEXAO);

try {
    await mongo_conexao.connect();
    db = mongo_conexao.db(process.env.BANCO_DE_DADOS_APLICACAO);
    console.log('Banco de dados conectado');
} catch (error) {
    console.error('Erro ao conectar o banco de dados');
}

export default db;