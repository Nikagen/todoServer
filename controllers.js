const List = require('./models.js');

exports.getTask = async (req, res) => {
  const { listId, taskId } = req.params;

  try {
    const list = await List.findOne({ _id: listId });

    if (list) {
      const task = list.tasks.find((task) => task.id == taskId);

      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } else {
      res.status(404).json({ error: 'List not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createTask =  async (req, res) => {
  const { listId } = req.params;
  const { tasks, task } = req.body;

  try {
    let existingList;
    if (listId) {
      existingList = await List.findOne({ _id: listId });
    }
    if (existingList) {
      existingList.tasks.push(task);
      await existingList.save();
      res.json(existingList);
    } else {
      const newList = new List({
        title: `List`,
        tasks: [...tasks],
      });
      await newList.save();
      res.json(newList);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteTask = async (req, res) => {
  const { listId, taskId } = req.params;

  try {
    const list = await List.findOne({ _id: listId });

    if (list) {
      list.tasks = list.tasks.filter((task) => task.id !== taskId);
      await list.save();
      res.json(list);
    } else {
      res.status(404).json({ error: 'List not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.editTask = async (req, res) => {
  const { listId, taskId } = req.params;
  const { newTitle } = req.body;

  try {
    const list = await List.findOne({ _id: listId });

    if (list) {
      const task = list.tasks.find((task) => task.id === taskId);

      if (task) {
        task.title = newTitle;
        await list.save();
        res.json(list);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } else {
      res.status(404).json({ error: 'List not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.editListTitle = async (req, res) => {
  const { listId } = req.params;
  const { newTitle } = req.body;

  console.log(listId)

  try {
    const list = await List.findOne({ _id: listId });

    if (list) {
      list.title = newTitle;
      await list.save();
      res.json(list);
    } else {
      res.status(404).json({ error: 'List not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.toggleCompleteTask =  async (req, res) => {
  const { listId, taskId } = req.params;

  console.log(req.params)

  try {
    const list = await List.findOne({ _id: listId });

    if (list) {
      const task = list.tasks.find((task) => task.id === taskId);

      if (task) {
        task.completed = !task.completed;
        await list.save();
        res.json(list);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } else {
      res.status(404).json({ error: 'List not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}