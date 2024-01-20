const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require ('cors')

const rotaProdutos = require('./routes/produtos')

//Log
app.use(morgan('dev'))

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//CORS
var corsOptions ={
    origin: "*",
    optionsSucessStatus: 200,
    methods: ['GET','POST','PATCH','DELETE']
}
app.use(cors(corsOptions))

//Rotas
app.use('/produtos', rotaProdutos);

app.use((req,res,next)=> {
    const erro = new Error("Não encontrado");
    erro.status = 404;
    next(erro);
})

app.use((error,req,res,next)=> {
    res.status(error.status || 500);
    return res.send({
        erro: {
            msg: error.message
        }
    })
})

//Exports
module.exports = app;
