const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Tasks = require('../models/task.js');

router.post('/tasks', auth, async (req, res) => {
  // const tasks = new Tasks(req.body);

  const tasks = new Tasks({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await tasks.save();
    res.status(201).send(tasks);
  } catch (e) {
    res.status(400).send();
  }
  // tasks
  //   .save()
  //   .then(() => {
  //     res.status(201).send(tasks);
  //   })
  //   .catch((e) => {
  //     res.status(400).send(e);
  //   });
});

//GET /tasks?comlpeted=false
// limit
// GET /tasks?limit=1&skip=2
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
  try {
    // const tasks = await Tasks.find();
    // const tasks = await Tasks.find({ owner: req.user._id });
    //alternative
    const match = {};
    const sort = {};

    if (req.query.completed) {
      match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
      // console.log('sort', sort);
    }

    await req.user.populate({
      path: 'tasks',
      match: match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort: sort,
        // sort: {
        //   // createdAt: -1, //-1-->desc 1-->asc
        //   // completed: 1,
        // },
      },
    });

    // if (!tasks) {
    //   return res.status(404).send();
    // }
    // res.send(tasks);
    res.send(req.user.tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }

  // Tasks.find()
  //   .then((tasks) => {
  //     if (!tasks) {
  //       return res.status(404).send();
  //     }
  //     res.send(tasks);
  //   })
  //   .catch((e) => {
  //     res.status(500).send();
  //   });
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Tasks.findById(_id);
    const task = await Tasks.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(404).send();
  }
  // Tasks.findById(_id)
  //   .then((tasks) => {
  //     res.send(tasks);
  //   })
  //   .catch((e) => {
  //     res.status(500).send();
  //   });
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['descriptiom', 'completed'];

  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid updates' });
  }

  try {
    // const task = await Tasks.findById(req.params.id);
    // using the populate alternative
    const task = await Tasks.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();
    // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    res.send(task);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    // const task = await Tasks.findByIdAndDelete(req.params.id);
    const task = await Tasks.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
