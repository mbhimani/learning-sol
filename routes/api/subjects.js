const route = require('express').Router();
const {Subject} = require('../../db');
const {Subject_Teacher} = require('../../db');

route.get('/', (req,res) => {
    Subject.findAll().then((subjects) => {
        res.status(200).send(subjects);
    }).catch((err) => {
        res.status(500).send({
            error: 'cannot retrieve subjects'
        });
    });
});

route.get('/:id', (req,res) => {
    Subject.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    }).then((subject) => {
        res.status(200).send(subject);
    }).catch((err) => {
        res.status(500).send({
            error: 'cannot retrieve subject'
        });
    });
});

route.get('/:id/teachers', (req, res) => {
    Subject_Teacher.findAll({
        where: {
            subjectId : parseInt(req.params.id)
        },
        include: {
            model: Teacher
        }
    }).then((teachers) => {
        res.status(200).send(teachers);
    }).catch((err) => {
        res.status(500).send({
            error: 'cannot retrieve teachers'
        });
    });
});

module.exports = route;