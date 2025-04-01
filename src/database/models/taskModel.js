const TABLE_NAME = process.env.TABLE_NAME || 'Tasks';
const TaskStatus = {
    TODO: 'to-do',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
};
module.exports = { TABLE_NAME, TaskStatus };
