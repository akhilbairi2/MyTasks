import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {task, type} = taskDetails
  return (
    <li className="li-container">
      <p className="para">{task}</p>
      <p className="para1">{type}</p>
    </li>
  )
}
export default TaskItem
