// Task status enum
enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

type Task = {
  id: number;
  title: string;
  description: string;
  status: keyof typeof TaskStatus;
  createdAt: Date;
};

// Task creation function
function createTask(
  id: number,
  title: string,
  description: string,
  status: keyof typeof TaskStatus
) {
  return {
    id,
    title,
    description,
    status,
    createdAt: new Date(),
  };
}

// Task list
let tasks: Task[] = [];

// Add task to the list
function addTask(task: Task) {
  tasks.push(task);
}

// Get task by ID
function getTaskById(id: number) {
  return tasks.find((task) => task.id === id);
}

// Update task status
function updateTaskStatus(id: number, newStatus: keyof typeof TaskStatus) {
  const task = getTaskById(id);
  if (task) {
    task.status = newStatus;
  }
}

type ITaskManager = {
  tasks: Task[];
  addTask: (task: Task) => void;
  getTasksByStatus: (status: keyof typeof TaskStatus) => Task[];
};

// Task manager
const TaskManager: ITaskManager = {
  tasks: [],
  addTask: function (task: Task) {
    this.tasks.push(task);
  },
  getTasksByStatus: function (status) {
    return this.tasks.filter((task) => task.status === status);
  },
};

type QueueTask = {
  element: Task;
  priority: number;
};

type QueueParam = {
  items: QueueTask[];
};

type IPriorityQueue = {
  enqueue: (element: Task, priority: number) => void;
};

// Priority Queue
function PriorityQueue(this: QueueParam) {
  this.items = [];
}

PriorityQueue.prototype.enqueue = function (element: Task, priority: number) {
  /**
   * How would you infer the Task[] type from `items`?
   */

  (this.items as QueueTask[]).push({ element, priority });
  (this.items as QueueTask[]).sort((a, b) => a.priority - b.priority);
};

PriorityQueue.prototype.dequeue = function () {
  return this.items.shift();
};

// Utility function
function isTaskOverdue(task: Task, currentDate: Date) {
  // Assuming tasks are overdue if they're older than 7 days and not completed
  const sevenDaysAgo = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );
  return task.createdAt < sevenDaysAgo && task.status !== TaskStatus.DONE;
}

// Usage example
const task1 = createTask(
  1,
  "Complete project",
  "Finish the project by Friday",
  TaskStatus.TODO
);
addTask(task1);

const task2 = createTask(
  2,
  "Review code",
  "Review team's code",
  TaskStatus.IN_PROGRESS
);
TaskManager.addTask(task2);

updateTaskStatus(1, TaskStatus.IN_PROGRESS);

/**
 * Improve type of priorityQueue!!
 */

const priorityQueue = new (PriorityQueue as any)();
priorityQueue.enqueue(task1, 2);
priorityQueue.enqueue(task2, 1);

console.log("--- getTaskById ---\n", getTaskById(1));
console.log(
  "--- getTasksByStatus ---\n",
  TaskManager.getTasksByStatus(TaskStatus.IN_PROGRESS)
);
console.log("--- dequeue ---\n", priorityQueue.dequeue());
console.log("--- isTaskOverdue ---\n", isTaskOverdue(task1, new Date()));
console.log("--- tasks ---\n", priorityQueue.items);
