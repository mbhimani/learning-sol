const route = require('express').Router();
const {Teacher} = require('../../db');
const {Teacher_Batch} = require('../../db');

route.get('/', (req,res) => {
    Teacher.findAll().then((teachers) => {
        res.status(200).send(teachers);
    }).catch((err) => {
        res.status(500).send({
            error: 'cannot retrieve teachers'
        });
    });
});

route.get('/:id', (req,res) => {
    Teacher.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    }).then((teacher) => {
        res.status(200).send(teacher);
    }).catch((err) => {
        res.status(500).send({
            error: 'cannot retrieve teacher'
        });
    });
});

route.get(':id/batches', (req,res) => {
    Teacher_Batch.findAll({
        where: {
            teacherId: parseInt(req.params.id)
        },
        include: {
            model: Batch
        }
    }).then((teachers) => {
        res.status(200).send(teachers);
    }).catch((err) => {
        res.status(500).send({
            error: 'cannot retrieve batches'
        });
    });
});

module.exports = route;