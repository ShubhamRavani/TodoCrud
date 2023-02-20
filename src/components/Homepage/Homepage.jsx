import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function Homepage() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTodo, setModalTodo] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        title: modalTodo.title,
        description: modalTodo.description,
        completed: false,
      },
    ]);
    setShowModal(false);
  };

  const handleEdit = (index) => {
    setModalTodo(todos[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setTodos([
      ...todos.slice(0, editIndex),
      {
        title: modalTodo.title,
        description: modalTodo.description,
        completed: todos[editIndex].completed,
      },
      ...todos.slice(editIndex + 1),
    ]);
    setShowModal(false);
    setEditIndex(-1);
  };

  const handleCancel = () => {
    setModalTodo({ title: "", description: "", completed: false });
    setShowModal(false);
    setEditIndex(-1);
  };

  const handleComplete = (index) => {
    setTodos([
      ...todos.slice(0, index),
      { ...todos[index], completed: true },
      ...todos.slice(index + 1),
    ]);
  };

  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="container">
      <h1 className="text-center">TODO List</h1>

      <div className="row">
        <div className="col mt-5">
          <h3>Pending</h3>
          <ul className="list-group">
            {pendingTodos.map((todo, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {todo.title}
                <div>
                  <button
                    className="btn btn-sm btn-info mr-2 me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleComplete(index)}
                  >
                    Complete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col mt-5">
          <h3>Completed</h3>
          <ul className="list-group">
            {completedTodos.map((todo, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {todo.title}
                <div>
                  <button
                    className="btn btn-sm btn-info mr-2 me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button className="mt-3" onClick={() => setShowModal(true)}>
        Add TODO
      </Button>

      <Modal show={showModal} onHide={handleCancel}>
        <Form onSubmit={editIndex !== -1 ? handleSave : handleAdd}>
          <Modal.Header closeButton>
            <Modal.Title>{editIndex !== -1 ? "Edit" : "Add"} TODO</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={modalTodo.title}
                onChange={(e) =>
                  setModalTodo({ ...modalTodo, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={modalTodo.description}
                onChange={(e) =>
                  setModalTodo({ ...modalTodo, description: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Homepage;
