const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  // useCreateIndex: false,
});

// const Tasks = mongoose.model('Tasks', {
//   description: {
//     type: String,
//     trim: true,
//     required: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });

// const addTask = new Tasks({
//   description: 'COmplete the Node js course',
//   completed: true,
// });

// addTask
//   .save()
//   .then((addTask) => {
//     console.log(addTask);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const me = new User({
//   name: '  Batman Begins',
//   email: 'mike@gmail.com   ',
//   password: 'customeAPIbaitch',
//   // age: -1,
// });

// me.save()
//   .then((me) => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
