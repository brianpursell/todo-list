import React from 'react';

const List = props => (
  <div>
    {props.todos.map(todo => (
      <ListItem
        key={todo.id}
        itemId={todo.id}
        name={todo.name}
        activeModal={todo.activeModal}
        isComplete={todo.is_complete}
        handleClick={props.handleClick}
        handleDelete={props.handleDelete}
      />
    ))}
  </div>
);

const ListItem = props => {
  let text = props.isComplete ? 'line-through' : '';
  let activeModal = props.activeModal ? 'is-active' : '';
  return (
    <div className="notification">
      <span
        style={{ textDecoration: text }}
        onClick={e => props.handleClick(props.itemId, props.isComplete)}
      >
        {props.name}
      </span>
      {/* <button
        className="delete is-small"
        onClick={e => props.handleDelete(props.itemId)}
      /> */}
      <EditItem isActive={activeModal} />
    </div>
  );
};

const EditItem = props => {
  return (
    <div className={`modal ${props.isActive}`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header
          className="modal-card-head"
          style={{ justifyContent: 'flex-end' }}
        >
          <button className="delete" aria-label="close" />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <div className="control">
              <input
                className="input is-primary"
                type="text"
                // value={this.state.newTodo.name}
                // onChange={this.handleChange}
              />
            </div>
          </div>
        </section>
        <footer
          className="modal-card-foot"
          style={{ justifyContent: 'flex-end' }}
        >
          <button className="button is-danger">Delete</button>
          <button className="button is-warning">Mark Done</button>
          <button className="button is-primary">Save</button>
        </footer>
      </div>
    </div>
  );
};

export default List;
