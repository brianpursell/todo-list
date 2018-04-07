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
      <div>
        <input
          type="text"
          value={this.state.newTodo.name}
          onChange={this.handleChange}
        />
        <input type="submit" value="submit" onClick={this.handleSubmit} />
        <p>There are {this.state.todos.length} todos.</p>
        <List
          todos={this.state.todos}
          handleClick={this.handleClick}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
