// docker ps
// docker exec -it 5ceb26d7176a mongo -u admin -p gostack --authenticationDatabase heroes

// databases
// show dbs

// mudando o contexto para uma database
// use heroes

// mostrar tables (collections)
// show collections

db.heroes.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.heroes.find()
db.heroes.find().pretty()

for (let i = 0; i <= 1000; i++) {
    db.heroes.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

db.heroes.count()
db.heroes.findOne()
db.heroes.find().limit(100).sort({ nome: -1 })
db.heroes.find({}, { poder: 1, _id: 0 })
db.heroes.find({ nome: 'Flash' })

// create
db.heroes.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

// read
db.heroes.find()

// update
db.heroes.update({ _id: ObjectId("60ac1eb55877727b301f943e") }, {
    nome: 'Mulher Maravilha'
})

db.heroes.update({ _id: ObjectId("60ac1ecb5877727b301f981f") }, {
    $set: { nome: 'SuperMan' }
})

db.heroes.update({ _id: ObjectId("60ac1ecb5877727b301f981f") }, {
    $set: { name: 'SuperMan' }
})

// delete
db.heroes.remove({}) // remove todos registros
db.heroes.remove({ nome: 'Mulher Maravilha' })