import React, { Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AddTodo from '../../components/AddTodo';
import UpdateTodo from '../../components/UpdateTodo';
import AlertTodo from '../../components/AlertTodo';
import io from 'socket.io-client';
let socket = io.connect('http://localhost:3000/');

class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      showModalEdit: false,
      todoDate: null,
      alertToggle: false,
      alertType: null,
    }

    this.handleAlert = this.handleAlert.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.renderTodos = this.renderTodos.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    socket.on('loadTodos', (data) => {
      this.setState({
        todos: data,
      });
    });
  }
  handleAlert() {
    this.setState({
      alertToggle: !this.state.alertToggle,
    });
  }
  handleModal(todo) {
    this.setState({
      showModalEdit: !this.state.showModal,
      todoData: todo,
    });
  }
  handleDelete(id) {
    const { alertToggle, alertType } = this.state;
    socket.emit('deleteTodo', id, (data) => {
      if(data) {
        this.setState({
          name: '',
          description: '',
          alertToggle: !alertToggle,
          alertType: 'success',
        });
      }
      else {
        this.setState({
          alertToggle: !alertToggle,
          alertType: 'danger',
        });
      }
    })
  }
  renderTodos() {
    const { todos } = this.state;

    return todos.map((todo, i) => 
      <Card key={i} className="mb-2" bg="dark" text="white">
        <Card.Body>
          <p className="lead" style={{marginBottom: -5}}><strong>{todo.name}</strong></p>
          <small className="text-muted"><i className="fa fa-clock fa-fw"></i> {`${new Date(todo.timestamp).toDateString()} - ${new Date(todo.timestamp).toLocaleTimeString()}`}</small>
          <p className="mt-2" style={{marginBottom: -3}}>{todo.description}</p>
        </Card.Body>
        <Card.Footer>
          <Button variant="danger" onClick={() => this.handleModal(todo)} size="sm" className="mr-1"><i className="fa fa-edit fa-fw"></i></Button>
          <Button variant="danger" onClick={() => this.handleDelete(todo._id)} size="sm"><i className="fa fa-times fa-fw"></i></Button>
        </Card.Footer>
      </Card>
    )
  }
  render() {
    const { showModalEdit, todoData, alertToggle, alertType } = this.state;

    return (
      <Container className="mt-2 mb-5">
        <Row>
          <Col md={5}>
            <AddTodo socket={socket}></AddTodo>
            <p className="mt-3 text-center">&copy; Realtime Todo Application 2019. All Rights Reserved.</p>
          </Col>
          <Col md={7}>
            <AlertTodo type={alertType} method="delete" alertToggle={alertToggle} handleAlert={this.handleAlert}></AlertTodo>
            {todoData ?
              <UpdateTodo socket={socket} showModalEdit={showModalEdit} todoData={todoData} handleModal={this.handleModal}></UpdateTodo>
              : null
            }
            {this.renderTodos()}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default HomePage;