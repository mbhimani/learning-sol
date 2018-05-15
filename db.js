const sequelize = require('sequelize');

const db = new sequelize({
    dialect: 'sqlite',
    storage: './learningDb.db'
});

const Student = db.define('student', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    }
});

const Batch = db.define('batch', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    }
});

const Course = db.define('course', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    }
});

const Teacher = db.define('teacher', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    }
});

const Lecture = db.define('lecture', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    }
});

const Subject = db.define('subject', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    }
});

const Batch_Student = db.define(
    
    // studentId: {
    //   type: sequelize.INTEGER,
    //   references: 'Student',
    //   referencesKey: 'id',
    //   allowNull: false
    // },
    // BatchId: {
    //   type: sequelize.INTEGER,
    //   references: 'Batch',
    //   referencesKey: 'id',
    //   allowNull: false
    // }
)

const Subject_Teacher = db.define(
    // subjectId: {
    //   type: sequelize.INTEGER,
    //   references: 'Subject',
    //   referencesKey: 'id',
    //   allowNull: false
    // },
    // TeacherId: {
    //   type: sequelize.INTEGER,
    //   references: 'Teacher',
    //   referencesKey: 'id',
    //   allowNull: false
    // }
)

const Teacher_Batch = db.define(
    // teacherId: {
    //   type: sequelize.INTEGER,
    //   references: 'Teacher',
    //   referencesKey: 'id',
    //   allowNull: false
    // },
    // batchId: {
    //   type: sequelize.INTEGER,
    //   references: 'Batch',
    //   referencesKey: 'id',
    //   allowNull: false
    // }
)

Course.hasMany(Batch);
Batch.belongsTo(Course);

Course.hasMany(Subject);
Subject.belongsTo(Course);

Subject.belongsToMany(Teacher, {through: 'Subject_Teacher'});
//Teacher.hasMany(Subject, {through: 'Subject_Teacher'});

Batch.hasMany(Lecture);
Lecture.belongsTo(Batch);

Lecture.belongsTo(Subject);
Subject.hasMany(Lecture);

Teacher.hasMany(Lecture);
Lecture.belongsTo(Teacher);

Batch.belongsToMany(Student, {through: 'Batch_Student'});
//Student.hasMany(Batch, {through: 'Batch_Student'});

Batch.belongsToMany(Teacher, {through: 'Teacher_Batch'});


db.sync()
  .then(() => console.log('database created'))
  .catch((err) => console.log(err));

  module.exports = {
      Student,
      Subject,
      Teacher,
      Course,
      Lecture,
      Batch,
      Batch_Student,
      Subject_Teacher,
      Teacher_Batch
  }