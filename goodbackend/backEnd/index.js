// Express Initialisation
const express = require("express");
const app = express();
const port = 8888;


const mongoose = require ('mongoose')
mongoose.connect('mongodb+srv://scumpica1:scumpica1@cluster0.wlxhy7x.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const Credentials = mongoose.model("Credentials", new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}));

//const Schedule = mongoose.model("Schedule", Credentials) 

const credentials = new Credentials({
  email: "yourEmail@example.com",
  password: "yourPassword"
});

credentials.save()
  .then(() => console.log('Credentials saved...'))
  .catch(err => console.error('Could not save credentials...', err));

Credentials.find()
  .then(credentials => console.log(credentials))
  .catch(err => console.error('Could not find credentials...', err));

//mongoose.connect('mongodb+srv://scumpica1:scumpica1@cluster0.wlxhy7x.mongodb.net/yourDBname?retryWrites=true&w=majority')


// Import created models

// Student.belongsToMany(Feedback);
// Activity.belongsToMany(Student, {through: "enrollments"});

// Define the model relationship.

let ActivitySchema = new mongoose.Schema({
  email: String
})
const Activity = mongoose.model('Activity', ActivitySchema);
module.exports = Activity;

let FeedbackSchema = new mongoose.Schema({
  email: String
})
const Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;

let ProfessorSchema = new mongoose.Schema({
  email: String
})
const Professor = mongoose.model('Professor', ProfessorSchema);
module.exports = Professor;

let StudentSchema = new mongoose.Schema({
  email: String
})
const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;

/*Activity.hasMany(Student);
Activity.hasMany(Feedback);
Professor.hasMany(Activity);*/
//call express library

app.get('/', (req, res) => {
  res.send('Hello World!')
})


/*Credentials.save()
  .then(() => console.log('Credentials saved...'))
  .catch(err => console.error('Could not save credentials...', err));*/

// Find all notes
Credentials.find()
  .then(notes => console.log(notes))
  .catch(err => console.error('Could not find notes...', err));





const { application, response } = require("express");


// Express middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.listen(port, () => {
  console.log(`Server Started at ${port}`)
})

// Define entities relationship

// Student.belongsToMany(Feedback);
// Activity.belongsToMany(Student, {through: "enrollments"});




// Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
  console.error("[ERROR]:" + err);
  res.status(500).json({ message: "500 - Server Error" });
});


/**
 * Create a special GET endpoint so that when it is called it will
 * sync our database with the models.
 */
 /* app.get("/create", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created with the models." });
  } catch (err) {
    next(err);
  }
}); */

/**
 * GET all the Activities from the database.
 */
 app.get("/activities", async (req, res, next) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    next(err);
  }
});


/**
 * GET all the Students from the database.
 */
 app.get("/students", async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new Professor to the database.
 */
 app.post("/professor/add", async (req, res, next) => {
  try {
    await Professor.create(req.body);
    res.status(201).json({ message: "Professor is created!" });
    const newUser = new Credentials({email:email, password: password}); newUser.save();
  } catch (err) {
    next(err);
  }
});

/**
 * GET all the Professors from the database.
 */
 app.get("/professors", async (req, res, next) => {
  try {
    const professor = await Professor.find();
    res.status(200).json(professor);
  } catch (err) {
    next(err);
  }
});

/**
 * GET a specific professor's activity.
 */
 app.get("/professors/:professorId/activities", async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.professorId, {
      include: [Activity],
    });
    if (professor) {
      res.status(200).json(professor.activities);
    } else {
      res.status(404).json({ message: "404 - Professor Not Found!" });
    }
  } catch (err) {
    next(err);
  }
});


/**
 * POST a new activity of a professor.
 */
 app.post("/professors/:professorId/activities", async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.professorId);
    if (professor) {
      const activity = new Activity(req.body);
      activity.professorId = professor.id;
      await activity.save();
      res.status(201).json({ message: "Activity created" });
    } else {
      res.status(404).json({ message: "404 - Professor Not Found!" });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * GET a specific professor's activities.
 */
 app.get("/professors/:professorId/activities", async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.professorId, {
      include: [Activity],
    });
    if (professor) {
      res.status(200).json(professor.activities);
    } else {
      res.status(404).json({ message: "404 - Professor Not Found!" });
    }
  } catch (err) {
    next(err);
  }
});



/**
 * DELETE an activity of a Professor.
 */
 app.delete('/professors/:professorId/activities/:activityId', async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.professorId)
    if (professor) {
      const activity = await Activity.findByPk(req.params.activityId)
      if (activity) {
        await activity.destroy()
        res.status(202).json({ message: 'Activity deleted!'})
      } else {
        res.status(404).json({ message: '404 - Activity Not Found' })
      }
    } else {
      res.status(404).json({ message: '404 - Professor Not Found!' })
    }
  } catch (err) {
    next(err);
  }
});


// /**
//  * POST a new Activity to the database.
//  */
//  app.post("/activity/add", async (req, res, next) => {
//   try {
//     await Activity.create(req.body);
//     res.status(201).json({ message: "Activity Created!" });
//   } catch (err) {
//     next(err);
//   }
// });


/**
 * GET all the activities from a specific  Professor 
 */
 app.get("/professors/:professorId/activities", async(req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.professorId, {
      include: [Activity]
    });
    if(professor) {
      res.status(200).json(professor.activities);
    } else {
      res.status(404).json({message: '404 - Professor not found!'});
    }
  } catch(error) {
    next(error);
  }
})



/**
 * GET a specific activity's students.
 */
 app.get("/professors/:professorId/activities/:activityId/students", async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.professorId);
    if(professor){

      const activity = await Activity.findByPk(req.params.activityId, {
        include: [Student],
      });
      if (activity) {
        res.status(200).json(activity.students);
      } else {
        res.status(404).json({ message: "404 - Activity Not Found!" });
      }
    }

  } catch (err) {
    next(err);
  }
});


/**
 * POST a new student into a activity.
 */
 app.post("/activities/:activityId/students", async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.activityId);
    if (activity) {
      const student = new Student(req.body);
      student.activityId = activity.id;
      await student.save();
      res.status(201).json({ message: "Student created" });
    } else {
      res.status(404).json({ message: "404 - University Not Found!" });
    }
  } catch (err) {
    next(err);
  }
});


/**
 * GET a student by the id from a specific activity by its id.
 */
 app.get('/activities/:activityId/students/:studentId', async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.activityId)
    if (activity) {
      const students = await activity.getStudents({ id: req.params.studentId })
      const student = students.shift()
      if (student) {
        res.status(202).json(student)
      } else {
        res.status(404).json({ message: '404 - Student Not Found!' })
      }
    } else {
      res.status(404).json({ message: '404 - Activity Not Found!' })
    }
  } catch (err) {
    next(err);
  }
});


/**
 * GET all the students from a specific  activity 
 */
app.get("/activities/:activityId/students", async(req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.activityId, {
      include: [Student]
    });
    if(activity) {
      res.status(200).json(activity.students);
    } else {
      res.status(404).json({message: '404 - Activity not found!'});
    }
  } catch(error) {
    next(error);
  }
})


/**
 * PUT to update a student from a specific activity.
 */
 app.put('/activities/:activityId/students/:studentId', async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.activityId)
    if (activity) {
      const students = await activity.getStudents({ id: req.params.studentId })
      const student = students.shift()
      if (student) {
        student.studentFullName = req.body.fullName
        student.studentStatus = req.body.status
        await student.save()
        res.status(202).json({ message: 'Student updated!'})
      } else {
        res.status(404).json({ message: '404 - Student Not Found!' })
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!' })
    }
  } catch (err) {
    next(err);
  }
});


/**
 * DELETE a student from an Activity.
 */
 app.delete('/activities/:activityId/students/:studentId', async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.activityId)
    if (activity) {
      const students = await activity.getStudents({ id: req.params.studentId })
      const student = students.shift()
      if (student) {
        await student.destroy()
        res.status(202).json({ message: 'Student deleted!'})
      } else {
        res.status(404).json({ message: '404 - Student Not Found' })
      }
    } else {
      res.status(404).json({ message: '404 - Activity Not Found!' })
    }
  } catch (err) {
    next(err);
  }
});


/**
 * 
 */