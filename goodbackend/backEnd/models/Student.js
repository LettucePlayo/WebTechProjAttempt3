const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema("student", {
    name : {
        type : DataTypes.STRING,
        allowNull: false,
        validate: {
            len : [3, 45]
        }
    },
    
    username : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [3, 15]
        }
    },
    
    pass : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [3, 10]
        }
    }
 }, {
 timestamps : false
});

module.exports = Student;


// module.exports = function(sequelize, DataTypes) {
//   var Student = sequelize.define('student', {
//      name : {
//          type : DataTypes.STRING,
//          allowNull: false,
//          validate: {
//              len : [3, 45]
//          }
//      },
     
//      username : {
//          type : DataTypes.STRING,
//          allowNull : false,
//          validate : {
//              len : [3, 15]
//          }
//      },
     
//      pass : {
//          type : DataTypes.STRING,
//          allowNull : false,
//          validate : {
//              len : [3, 10]
//          }
//      }
//   }, {
//   timestamps : false
// });
  
//   return Student;
// }