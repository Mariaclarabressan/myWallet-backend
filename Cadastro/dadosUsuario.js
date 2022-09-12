import db from "../BancoMongo/mongodb.js";
import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';



const cadastroInicial = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmasenha: joi.ref('password')
})

const loginInicial = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export async function loginUsuario(req,res) {
    try {
        const loginSession = req.body;

        const validaDados = loginInicial.validate(loginSession);

        if(validaDados.error){
            return res.status(500).send('Preencha os dados corretamente')
        }


        const findUsuario = await db.collection('novoUsuario').findOne({
            email: loginSession.email
        });

        if (findUsuario && bcrypt.compareSync(loginSession.password, findUsuario.password)) {
            const token = uuid();
            await db.collection("sessions").insertOne({
                IdUsuario : findUsuario._id,
                token
            });

            res.status(200).send({ token, name: findUsuario.name })
        } else {
            return res.status(500).send("Dados inválidos")
        }

        
    } catch (error) {
        return res.status(500).send("Não foi possível conectar o usuário")
        
    }
}

export async function cadastroUsuario(req, res) {

    try {
        const cadastroSession = req.body;

        const validaDados = cadastroInicial.validate(cadastroSession);

        if(validaDados.error){
            return res.status(500).send('Preencha os dados corretamente')
        }

        const senhaCriptografada = bcrypt.hashSync(cadastroSession.password, 10);

        await db.collection('novoUsuario').insertOne({
            name: cadastroSession.name,
            email: cadastroSession.email,
            password: senhaCriptografada
        })

        res.status(200).send("Usuário cadastrado com sucesso!")
    } catch (error) {
        console.log("Não foi possível cadastrar o usuário")
    }
}