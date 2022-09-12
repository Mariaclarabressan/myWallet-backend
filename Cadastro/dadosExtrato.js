import db from "../BancoMongo/mongodb.js";
import joi from 'joi';

const valorDeTrasacoes = joi.object({
    type: joi.string().required(),
    value: joi.number().required(),
    descricao: joi.string().required
})

export async function EntradaValor(req, res) {

    const { value, descricao, type } = req.body;

    const mostraValores = valorDeTrasacoes.validate({ value, descricao, type });

    if (mostraValores.error) {
        return res.status(422).send('Não há valores');
    }

    try {
        const { loginSession } = res.locals;
        await db
            .collection('transacoes')
            .insertOne({
                value,
                descricao,
                type,
                IdUsuario: loginSession._id,
                dia: dayjs().format('DD/MM')
            });
        res.sendStatus(201);
    } catch (error) {
        console.error('Deu pau na hora de cadastrar a transacao');
        res.sendStatus(500);
    }

}

export async function MostrarTransacoes(req, res) {
    const { loginSession } = res.locals;
    console.log(loginSession._id);
    try {
        const transactions = await db
            .collection('transacoes')
            .find({ IdUsuario: loginSession._id })
            .toArray();

        res.status(200).send(transactions);
    } catch (error) {
        console.error('Transações não disponíveis');
    }
}