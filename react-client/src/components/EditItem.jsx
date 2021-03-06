import React from 'react';

const EditItem = props => {
  let showModal = props.editing ? 'is-active' : '';
  let status = 'Mark done';
  let name = '';
  if (props.editing) {
    if (parseInt(props.editing.is_complete)) {
      status = 'Mark undone';
    }
    if (props.editing.name) {
      name = props.editing.name;
    }
  }
  return (
    <div className={`modal ${showModal}`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header
          className="modal-card-head"
          style={{ justifyContent: 'flex-end' }}
        >
          <button
            className="delete"
            onClick={e => props.handleClick()}
            aria-label="close"
          />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <div className="control">
              <input
                className="input is-primary"
                type="text"
                value={name}
                onChange={props.handleEdit}
              />
            </div>
          </div>
        </section>
        <footer
          className="modal-card-foot"
          style={{ justifyContent: 'flex-end' }}
        >
          <button className="button is-danger" onClick={props.handleDelete}>
            Delete
          </button>
          <button className="button is-warning" onClick={props.handleStatus}>
            {status}
          </button>
          <button className="button is-primary" onClick={props.handleSave}>
            Save
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EditItem;
