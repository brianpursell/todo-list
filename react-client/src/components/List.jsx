import React from 'react';

const List = props => (
  <table>
    <tbody>
      {props.todos.map(todo => (
        <ListItem
          key={todo.id}
          itemId={todo.id}
          name={todo.name}
          isComplete={todo.is_complete}
          handleClick={props.handleClick}
          handleDelete={props.handleDelete}
        />
      ))}
    </tbody>
  </table>
);

const ListItem = props => {
  let text = props.isComplete ? 'line-through' : '';
  return (
    <tr>
      <td onClick={e => props.handleDelete(props.itemId)}>
        <input type="button" value="x" />
      </td>
      <td onClick={e => props.handleClick(props.itemId, props.isComplete)}>
        <span style={{ textDecoration: text }}> {props.name}</span>
      </td>
    </tr>
  );
};

export default List;
