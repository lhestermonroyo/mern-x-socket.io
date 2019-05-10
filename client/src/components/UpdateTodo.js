import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import AlertTodo from '../components/AlertTodo';

class UpdateTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      description: '',
      alertToggle: false,
      alertType: null,
    }

    this.handleAlert = this.handleAlert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { todoData } = this.props;

    this.setState({
      id: todoData._id,
      name: todoData.name,
      description: todoData.description,
    });
  }
  handleAlert() {
    this.setState({
      alertToggle: !this.state.alertToggle,
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { socket } = this.props;
    const { id, name, description, alertToggle, alertType } = this.state;

    if(id && name && description) {
      socket.emit('updateTodo', { id, name, description }, (data) => {
        if(data) {
          this.setState({
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
      });
    }
    else {
      this.setState({
        alertToggle: !alertToggle,
        alertType: 'danger',
      });
    }
  }
  render() {
    const { showModalEdit, handleModal } = this.props;
    const { name, description, alertToggle, alertType } = this.state;

    return (
    <Modal show={showModalEdit} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AlertTodo type={alertType} method="update" alertToggle={alertToggle} handleAlert={this.handleAlert}></AlertTodo>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" onChange={this.handleChange} value={name} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" onChange={this.handleChange} value={description} rows="5" />
          </Form.Group>
          <Button className="mb-5" variant="dark" type="submit" block>Update Todo <i className="fa fa-edit fa-fw"></i></Button>
        </Form>
      </Modal.Body>
    </Modal>
    )
  }
}

export default UpdateTodo;