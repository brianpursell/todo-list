import React from 'react';

const ListItem = props => {
  let text = props.todo.is_complete ? 'line-through' : '';
  return (
    <div
      className="notification"
      style={{
        paddingTop: '10px',
        paddingBottom: '10px',
        marginBottom: '10px',
        border: '1px solid #00d1b2'
      }}
      onClick={e => props.handleClick(props.todo)}
    >
      <span
        style={{
          textDecoration: text
        }}
      >
        {props.todo.name}
      </span>
    </div>
  );
};

export default ListItem;
