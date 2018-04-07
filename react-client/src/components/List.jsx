import React from 'react';
import ListItem from './ListItem.jsx';

const List = props => (
  <div>
    {props.todos.map(todo => (
      <ListItem
        key={todo.id}
        // itemId={todo.id}
        // name={todo.name}
        todo={todo}
        // activeModal={todo.activeModal}
        // isComplete={todo.is_complete}
        handleClick={props.handleClick}
        handleDelete={props.handleDelete}
      />
    ))}
  </div>
);

export default List;
