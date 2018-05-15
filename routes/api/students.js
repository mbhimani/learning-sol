const route = require('express').Router();
const {
    Student
} = require('../../db');
const {
    Batch_Student
} = require('../../db');

route.get('/', (req, res) => {
    Student.findAll().then((students) => {
        res.status(200).send(students);
    }).catch((err) => {
        res.status(500).send({
            error: 'cannot retrieve students'
        });
    });
});

route.post('/', (req, res) => {
    Student.create({
        name: req.body.name
    }).then(() => {
        res.send('Student added succesfully');
    }).catch((err) => res.send('could not add the student'));
});

route.delete('/', (req, res) => {
    Student.destroy({
        where: {},
        truncate: true
    }).then(() => {
        res.send('Students deleted succesfully');
    }).catch((err) => res.send('could not delete the Students'));
})

route.get('/:id', (req, res) => {
    Student.findOne({
        where: {
            id: parseInt(req.params.id)
        }
    }).then((student) => {
        res.status(200).send(student);
    }).catch((err) => {
        res.status(500).send({
            error: 'cannot retrieve student'
        });
    });
});

route.put('/:id', (req, res) => {
    Student.findOne({
        where: {
            id: parseInt(req.param.id)
        }
    }).then((student) => {
        if (req.param.name !== undefined) {
            student.updateAttributes({
                name: req.param.name
            })
        }
    }).catch((err) => {
        res.send('Could not find student')
    })
});

route.get(':id/batches', (req, res) => {
    Batch_Student.findAll({
        where: {
            studentId: parseInt(req.params.id)
        },
        include: {
            model: Batch
        }
    }).then((students) => {
        res.status(200).send(students);
    }).catch((err) => {
        res.status(500).send({
            error: 'cannot retrieve batches'
        });
    });
});

route.post('/:id/batches', (req, res) => {
    Batch_Student.create({
        name: req.param.name,
        studentId: parseInt(req.param.id),
        batchId: parseInt(req.param.batchId)
    }).
    then(() => {
        res.send('batch added in student succesfully')
    }).
    catch((err) => {
        res.send('Cant add the Batch in student');
    })
})

route.delete('/:id/batches', (req, res) => {
    Batch_Student.destroy({
        where: {
            studentId: parseInt(req.param.id)
        },
        truncate: true
      }).then(() => {
       res.send('batches deleted succesfully from student')
    }).catch((err) => res.send('cant delete the batches from student'))
})

module.exports = route;