const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const multer = require('multer')

//Reponsavel pelo amarazenamento dos arquivos em disco
const storage = multer.diskStorage({
    //Função que define a pasta de armazenamento do arquivo
    destination: function (req, file, callback) {        
        callback(null, './upload')

    },
    //Função que seta o nome do arquivo
    filename: function (req, file, callback) {
        //salva arquivo com a data atual + nome original do arquivo (evitar subscrições)
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

//Função que interpreta o upload vindo da requisição. o name no input deve ser 'arquivo' como setado abaixo
const upload = multer({ storage }).single('arquivo')

app.use(express.static('.'))
//Função responsavel por transformar os dados a partir de qualque requisição
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Rota para upload
app.post('/upload', (req, res) => {
    //chamada da funçao upload
    upload(req, res, err => {
        if(err){
            return res.end('Ocorreu um erro.')
        }
        res.end('Upload concluido.')
    })
})

app.get('/teste', (req, res) => res.send('Ok😀'))

app.post('/formulario', (req, res) => {
    //Enviando como resposta um objeto que faz spread no corpo da requisição e também possui um id (estático)
    res.send({
        ...req.body,
        id: 1
    })
})

app.listen(8080, () => console.log('Executando na porta 8080! 🤖'))