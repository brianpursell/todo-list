import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import EditItem from './components/EditItem.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: {
        name: ''
      },
      editing: null,
      count: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.leftToDo = this.leftToDo.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  leftToDo() {
    let total = 0;

    this.state.todos.forEach(todo => {
      if (!todo.is_complete) {
        total++;
      }
    });
    this.setState({
      count: total
    });
  }

  getTodos(callback) {
    $.get('/todos', data => {
      this.setState({
        todos: data
      });
      this.leftToDo();
    });
  }

  toggleEdit(todo = null) {
    this.setState({
      editing: todo
    });
  }

  handleChange(event) {
    let name = event.target.value;
    this.setState(prevState => ({
      newTodo: {
        name: name
      }
    }));
  }

  handleEdit(event) {
    let name = event.target.value;
    this.setState(prevState => ({
      editing: {
        id: prevState.editing.id,
        name: name,
        is_complete: prevState.editing.is_complete
      }
    }));
  }

  handleSubmit() {
    if (this.state.newTodo.name.length) {
      $.post('/new-todo', this.state.newTodo, res => {
        console.log('new todo posted');
        this.getTodos();
        this.setState(prevState => ({
          newTodo: {
            name: ''
          }
        }));
      });
    }
  }

  handleSave() {
    $.post('/edit-todo', this.state.editing, res => {
      console.log('todo posted');
      this.getTodos();
      this.toggleEdit();
    });
  }

  handleDelete() {
    let data = {
      id: this.state.editing.id
    };

    $.post('/delete-todo', data, res => {
      console.log('todo posted');
      this.getTodos();
    });

    this.toggleEdit();
  }

  handleStatus() {
    let data = {
      id: this.state.editing.id,
      is_complete: parseInt(this.state.editing.is_complete)
    };

    $.post('/change-status', data, res => {
      console.log('todo posted');
      this.getTodos();
      this.toggleEdit();
    });
  }

  handleClick(todo) {
    this.toggleEdit(todo);
  }

  render() {
    let phrase = `You're all done!`;
    if (this.state.count === 1) {
      phrase = `Only 1 thing left to do!`;
    } else if (this.state.count > 1) {
      phrase = `Only ${this.state.count} things left to do!`;
    }
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-one-quarter" />
          <div className="column">
            <div className="field">
              <div className="control">
                <input
                  className="input is-primary"
                  type="text"
                  value={this.state.newTodo.name}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="control">
              <button
                className="button is-primary is-pulled-right"
                type="submit"
                value="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
            <p>{phrase}</p>
            <div
              className="section"
              style={{ paddingLeft: 0, paddingRight: 0, paddingTop: '25px' }}
            >
              <List
                todos={this.state.todos}
                handleClick={this.handleClick}
                handleDelete={this.handleDelete}
              />
            </div>
          </div>
          <div className="column is-one-quarter" />
        </div>
        <EditItem
          editing={this.state.editing}
          handleDelete={this.handleDelete}
          handleClick={this.handleClick}
          handleStatus={this.handleStatus}
          handleSave={this.handleSave}
          handleEdit={this.handleEdit}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
