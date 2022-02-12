/* USANDO JSON PARA ARMAZENAR DADOS */
const express = require('express')
const app = express()
const fs = require("fs");
const dadosjson = require('./dados.json')
const bodyparser = require('body-parser')
const ejs = require('ejs');
const { json } = require('body-parser');

app.set('view engine', 'ejs')
app.set('./views', 'views')

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

function pedido(nome, preco, prato, sabor, tipo/*, endereco*/){
    return {
        nome:nome,
        preco:preco,
        prato:prato,
        tipo:sabor,
        tipo:tipo
        //endereco:endereco,
    }
}

app.get('/', (req, res)=>{
    res.render('index', {pedidos:0})
})
app.get('/pizzas', (req, res)=>{
    res.render('pizzas', {pedidos:0})
})
app.get('/bebidas', (req, res)=>{
    res.render('bebidas', {pedidos:0})
})
app.get('/carnes', (req, res)=>{
    res.render('carnes', {pedidos:0})
})
app.get('/saladas', (req, res)=>{
    res.render('saladas', {pedidos:0})
})
app.get('/sobremesas', (req, res)=>{
    res.render('sobremesas', {pedidos:0})
})
app.get('/pedidos', (req, res)=>{
    let dados = JSON.stringify(dadosjson)
    let lista = JSON.parse(dados)
    res.render('./pedidos/lista', {lista:lista})
    console.log(lista)
})
app.post('/finaliza_pedido', (req, res)=>{

    let odi = pedido('jamir',req.body.preco, req.body.prato, req.body.sabor)
    dadosjson.push(odi)
    console.log(dadosjson)

    fs.writeFile('dados.json', (JSON.stringify(dadosjson)) + '\n', function(err){
        if(!err){
            console.log('dados salvos')
             res.render('index', {pedidos:0}) 
        }
    })
   
})

app.listen(8080)