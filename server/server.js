const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./doc/swagger.json');
var busboy = require('connect-busboy');
const fileUpload = require('express-fileupload');
const validUrl = require('valid-url');
//cloud
const path = require('path');
const cors = require('cors');
app.set("view options", {layout: false});

app.use(cors())
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(bodyParser.json());
app.use(busboy());
app.use(fileUpload()); // Don't forget this line!
app.use('/', express.static('img'));


//importacion de routes
const usuariosRoute = require('./routes/usuariosRoute');
const profesionistasRoute = require('./routes/profesionistasRoute');
const serviciosRoute = require('./routes/serviciosRoute');
const calificacionRoute = require('./routes/calificacionRoute');
const authRoute = require('./routes/authRoute');
const chatRoute = require('./routes/chatRoute');
//app.use('/registro111',express.static(__dirname + 'views/registroUsuario.html'));

app.use('/usuarios', usuariosRoute);
app.use('/profesionistas', profesionistasRoute);
app.use('/servicios', serviciosRoute);
app.use('/calificacion', calificacionRoute);
app.use('/auth', authRoute);
app.use('/api/chat', chatRoute);
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname+'/public'));




//routes

app.get('/', (req, res) => {
    try {
        //console.log("ddf");
        res.render('registroUsuario');
    } catch (err) {
        if (res.status == 404)
            res.status(404).json({
                message: "Peticion no encontrada",
                error: err
            });
        else if (err.status < 500) {
            res.status(err.status).json({
                message: "Error de cliente",
                error: err
            });
        } else
            res.status(500).json({
                message: "Algo salio mal :( !!",
                error: err
            });
    }
});


// conexion de BD
mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true
    },
    () => console.log('Conectado a MongoDB')
);

/*const AWS = require('aws-sdk');
const Busboy = require('busboy');

const BUCKET_NAME = 'pae2020';
const IAM_USER_KEY = 'AKIAWZONVNHIW7A55GXY';
const IAM_USER_SECRET = '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';

function uploadToS3(file) {
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function () {
        var params = {
            Bucket: BUCKET_NAME,
            Key: file.name,
            Body: file.data
        };
        s3bucket.upload(params, function (err, data) {
            if (err) {
                console.log('error in callback');
                console.log(err);
            }
            console.log('success');
            console.log(data);
            console.log(data.Location); //URL de imagen publica
        });
    });
}


//"element1": "test", "element2": image file

app.post('/api/upload', function (req, res, next) {

    const element1 = req.body.element1;

    var busboy = new Busboy({
        headers: req.headers
    });

    busboy.on('finish', function () {
        console.log('Upload finished');


        // {
        //    element2: {
        //      data: ...contents of the file...,
        //      name: 'Example.jpg',
        //      encoding: '7bit',
        //      mimetype: 'image/png',
        //      truncated: false,
        //      size: 959480
        //    }
        // }

        // Desde request
        const file = req.files.element2;
        console.log(file);

        // SUBIR ARCHIVO A BUCKET
        uploadToS3(file);
    });

    req.pipe(busboy);
});*/

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    
    const chat = require('./src/chat')(socket, io);
})


module.exports = app;

app.get('*',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

http.listen(port, () => console.log(`Listening on port ${port}`));

