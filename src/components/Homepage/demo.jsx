// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// function Demo() {
//   const [todos, setTodos] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalTodo, setModalTodo] = useState({
//     title: "",
//     description: "",
//     completed: false,
//   });
//   const [editIndex, setEditIndex] = useState(-1);

//   useEffect(() => {
//     const storedTodos = JSON.parse(localStorage.getItem("todos"));
//     if (storedTodos) {
//       setTodos(storedTodos);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   const handleAdd = (e) => {
//     e.preventDefault();
//     setTodos([
//       ...todos,
//       {
//         title: modalTodo.title,
//         description: modalTodo.description,
//         completed: false,
//       },
//     ]);
//     setShowModal(false);
//   };

//   const handleEdit = (index) => {
//     setModalTodo(todos[index]);
//     setEditIndex(index);
//     setShowModal(true);
//   };

//   const handleDelete = (index) => {
//     setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     setTodos([
//       ...todos.slice(0, editIndex),
//       {
//         title: modalTodo.title,
//         description: modalTodo.description,
//         completed: todos[editIndex].completed,
//       },
//       ...todos.slice(editIndex + 1),
//     ]);
//     setShowModal(false);
//     setEditIndex(-1);
//   };

//   const handleCancel = () => {
//     setModalTodo({ title: "", description: "", completed: false });
//     setShowModal(false);
//     setEditIndex(-1);
//   };

//   const handleComplete = (index) => {
//     setTodos([
//       ...todos.slice(0, index),
//       { ...todos[index], completed: true },
//       ...todos.slice(index + 1),
//     ]);
//   };

//   const pendingTodos = todos.filter((todo) => !todo.completed);
//   const completedTodos = todos.filter((todo) => todo.completed);

//   const handleDragEnd = (result) => {
//     if (!result.destination) {
//       return;
//     }

//     const newTodos = Array.from(todos);
//     const [reorderedItem] = newTodos.splice(result.source.index, 1);
//     newTodos.splice(result.destination.index, 0, reorderedItem);

//     setTodos(newTodos);
//   };

//   return (
//     <div className="container">
//       <h1 className="text-center">TODO List</h1>
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <div className="row">
//           <div className="col mt-5">
//             <h3>Pending</h3>
//             <Droppable droppableId="pending">
//               {(provided, snapshot) => (
//                 <ul
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   className={`list-group ${
//                     snapshot.isDraggingOver ? "dragging-over" : ""
//                   }`}
//                 >
//                   {pendingTodos.map((todo, index) => (
//                     <Draggable
//                       key={todo.title}
//                       draggableId={todo.title}
//                       index={index}
//                     >
//                       {(provided, snapshot) => (
//                         <li
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="list-group-item d-flex justify-content-between align-items-center"
//                           style={{
//                             userSelect: "none",
//                             backgroundColor: snapshot.isDragging
//                               ? "#e6f7ff"
//                               : "white",
//                             ...provided.draggableProps.style,
//                           }}
//                         >
//                           {todo.title}
//                           <div>
//                             <button
//                               className="btn btn-sm btn-info mr-2 me-2"
//                               onClick={() => handleEdit(index)}
//                             >
//                               Edit
//                             </button>
//                             <button
//                               className="btn btn-sm btn-danger me-2"
//                               onClick={() => handleDelete(index)}
//                             >
//                               Delete
//                             </button>
//                             <button
//                               className="btn btn-sm btn-success"
//                               onClick={() => handleComplete(index)}
//                             >
//                               Complete
//                             </button>
//                           </div>
//                         </li>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </ul>
//               )}
//             </Droppable>
//           </div>

//           <div className="col mt-5">
//             <h3>Completed</h3>
//             <Droppable droppableId="completed">
//               {(provided, snapshot) => (
//                 <ul
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   className={`list-group ${
//                     snapshot.isDraggingOver ? "dragging-over" : ""
//                   }`}
//                 >
//                   {completedTodos.map((todo, index) => (
//                     <Draggable
//                       key={todo.title}
//                       draggableId={todo.title}
//                       index={index}
//                     >
//                       {(provided, snapshot) => (
//                         <li
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="list-group-item d-flex justify-content-between align-items-center"
//                           style={{
//                             userSelect: "none",
//                             backgroundColor: snapshot.isDragging
//                               ? "#e6f7ff"
//                               : "white",
//                             ...provided.draggableProps.style,
//                           }}
//                         >
//                           {todo.title}
//                           <div>
//                             <button
//                               className="btn btn-sm btn-info mr-2 me-2"
//                               onClick={() => handleEdit(index)}
//                             >
//                               Edit
//                             </button>
//                             <button
//                               className="btn btn-sm btn-danger"
//                               onClick={() => handleDelete(index)}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </li>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </ul>
//               )}
//             </Droppable>
//           </div>
//         </div>
//       </DragDropContext>

//       <Button className="mt-3" onClick={() => setShowModal(true)}>
//         Add TODO
//       </Button>

//       <Modal show={showModal} onHide={handleCancel}>
//         <Modal.Header closeButton>
//           <Modal.Title>{editIndex >= 0 ? "Edit" : "Add"} Todo</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={editIndex >= 0 ? handleSave : handleAdd}>
//             <Form.Group controlId="formTitle">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={modalTodo.title}
//                 onChange={(e) =>
//                   setModalTodo({ ...modalTodo, title: e.target.value })
//                 }
//                 placeholder="Enter title"
//               />
//             </Form.Group>
//             <Form.Group controlId="formDescription">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={modalTodo.description}
//                 onChange={(e) =>
//                   setModalTodo({ ...modalTodo, description: e.target.value })
//                 }
//                 placeholder="Enter description"
//               />
//             </Form.Group>
//             <Button variant="secondary" onClick={handleCancel}>
//               Cancel
//             </Button>
//             <Button variant="primary" type="submit">
//               Save
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default Demo;
