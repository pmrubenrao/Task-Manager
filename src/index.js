const express = require('express');
require('./db/mongoose.js');
const Tasks = require('./models/task.js');

const userRouter = require('./router/user');
const taskRouter = require('./router/task');

const app = express();
const port = process.env.PORT || 3000;

// new middleware new erquest -> do soemthing -> run route handler

// Middleware componenet that act as an middle man
// app.use((req, res, next) => {
//   res.status(503).send('Site is under maintenance...');
// });

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

