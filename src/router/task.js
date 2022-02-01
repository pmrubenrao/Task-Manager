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

router.get('/tasks', auth, async (req, res) => {
  try {
    // const tasks = await Tasks.find();
    // const tasks = await Tasks.find({ owner: req.user._id });
    //alternative
    await req.user.populate('tasks').execPopulate();

    // if (!tasks) {
    //   return res.status(404).send();
    // }
    // res.send(tasks);
    res.send(req.user.tasks);
  } catch (e) {
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
    const task = await Task.findOne({
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
    res.status(500).send(e);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
