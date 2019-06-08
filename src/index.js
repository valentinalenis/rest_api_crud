const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

//database
const cursos = [
    {
        id:1,
        name:'Java',
        description:'Java to start',
        cost:200
    },
    {
        id:2,
        name:'phyton',
        description:'phyton to start',
        cost:200
    },
    {
        id:3,
        name:'Php',
        description:'Php to start',
        cost:200
    }
];

const estudiantes = [
    {
        idE:1,
        nameE:'Valentina',
        correoE:'Valentina@',
        telE:200
    },
    {
        idE:2,
        nameE:'Sebastian',
        correoE:'Sebastian@',
        telE:233
    },
    {
        idE:3,
        nameE:'Daniela',
        correoE:'Daniela@',
        telE:222
    }
];

//settings
app.set('port', process.env.PORT || 3002);

//Middleware(MORGAN-peticiones)
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//routes(URL)
app.get('/cursos', (request,response)=>{
 response.json(cursos);
 console.log(request.body);
});

app.get('/estudiantes', (request,response)=>{
    response.json(estudiantes);
    console.log(request.body);
   });

app.post('/cursos', (request, response)=>{
    const {name,description,cost } = request.body;
    cursos.push({
        id:cursos.length + 1,
        name:name,
        description:description,
        cost:cost
    });
    response.json('successfully created');
});

app.post('/estudiantes', (request, response)=>{
    const {nameE,correoE,telE } = request.body;
    estudiantes.push({
        idE:estudiantes.length + 1,
        nameE:nameE,
        correoE:correoE,
        telE:telE
    });
    response.json('successfully created');
    console.log(estudiantes);
});

app.put('/cursos/:id', (req, response) => {
    console.log(req.body, req.params)
    const { id } = req.params;
    const { name, description,cost } = req.body;


    cursos.forEach((curso) => {
        if(curso.id == id){
            curso.name = name;
            curso.description = description;
            curso.cost = cost;
        }
    });
    response.json('Successfully update');
});

app.delete('/cursos/:id', (request, response) => {
    const {id} = request.params;

    cursos.forEach((curso, i)=>{
        if(curso.id == id){
            cursos.splice(i, 1)
        }
    })
    response.json('Successfully delete')
});

app.delete('/estudiantes/:idE', (request, response) => {
    const {idE} = request.params;

    estudiantes.forEach((estudiante, i)=>{
        if(estudiante.idE == idE){
            estudiante.splice(i, 1)
        }
    })
    response.json('Successfully delete')
});

app.use(express.static(path.join(__dirname + '/public')));


app.listen(app.get('port'), ()=>{
    console.log(` Server on port ${app.get('port')}`);
});


