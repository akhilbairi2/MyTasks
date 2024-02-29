import {Component} from 'react'
import {v4} from 'uuid'
import TagItem from './components/TagItem'
import TaskItem from './components/TaskItem'

import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
class App extends Component {
  state = {
    tasksList: [],
    userTask: '',
    taskType: tagsList[0].optionId,
    activeTag: 'Initial',
  }

  onTagBtn = id => {
    this.setState(prevState => ({
      activeTag: id === prevState.activeTag ? 'Initial' : id,
    }))
  }

  onAddBtn = e => {
    e.preventDefault()
    const {userTask, taskType} = this.state
    const newTaskList = {
      id: v4(),
      task: userTask,
      type: taskType,
    }
    if (userTask.length !== 0) {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTaskList],
        userTask: '',
        taskType: tagsList[0].optionId,
      }))
    }
  }

  onTask = e => {
    this.setState({userTask: e.target.value})
  }

  onTaskType = e => {
    this.setState({taskType: e.target.value})
  }

  renderTasksView = () => {
    const {userTask, taskType} = this.state
    return (
      <form className="form-container" onSubmit={this.onAddBtn}>
        <h1 className="task-heading">Create a task</h1>
        <div className="input-container">
          <label htmlFor="task" className="label">
            Task
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter the task here"
            onChange={this.onTask}
            value={userTask}
            id="task"
          />
        </div>
        <div className="input-container">
          <label htmlFor="tags" className="label">
            Tags
          </label>
          <select
            className="select"
            value={taskType}
            onChange={this.onTaskType}
            id="tags"
          >
            {tagsList.map(each => (
              <option
                className="option"
                key={each.optionId}
                value={each.optionId}
              >
                {each.displayText}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="add-btn">
          Add Task
        </button>
      </form>
    )
  }

  renderTagsView = () => {
    const {tasksList, activeTag} = this.state
    const updateList =
      activeTag === 'Initial'
        ? tasksList
        : tasksList.filter(each => each.type === activeTag)
    return (
      <div className="tag-container">
        <h1 className="tag-heading">Tags</h1>
        <ul className="ul-container">
          {tagsList.map(each => (
            <TagItem
              tagDetails={each}
              key={each.optionId}
              onTagBtn={this.onTagBtn}
              isActive={activeTag === each.optionId}
            />
          ))}
        </ul>
        <h1 className="tag-heading">Tasks</h1>
        {updateList.length === 0 ? (
          <p className="no-tasks">No Tasks Added Yet</p>
        ) : (
          <ul className="task-list-container">
            {updateList.map(each => (
              <TaskItem taskDetails={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    const {userTask, taskType, tasksList} = this.state
    console.log(userTask)
    console.log(taskType)
    console.log(tasksList)
    return (
      <div className="main-container">
        <div className="main-card">
          {this.renderTasksView()}
          {this.renderTagsView()}
        </div>
      </div>
    )
  }
}

export default App
