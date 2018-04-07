import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: {
        name: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  getTodos() {
    $.get('/todos', data => {
      data.map(todo => {
        todo.activeModal = false;
      });
      this.setState({
        todos: data
      });
    });
  }

  componentDidMount() {
    this.getTodos();
  }

  handleChange(event) {
    let name = event.target.value;
    this.setState(prevState => ({
      newTodo: {
        name: name
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

  handleDelete(id) {
    let data = {
      id: id
    };
    $.post('/delete-todo', data, res => {
      console.log('todo posted');
      this.getTodos();
    });
  }

  handleClick(id, status) {
    let data = {
      id: id,
      is_complete: status
    };
    $.post('/edit-todo', data, res => {
      console.log('todo posted');
      this.getTodos();
    });
  }

  render() {
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
            <p>You have {this.state.todos.length} todo list item(s).</p>
            <div
              className="section"
              style={{ paddingLeft: 0, paddingRight: 0 }}
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
