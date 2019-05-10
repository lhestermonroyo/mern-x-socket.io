import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import AlertTodo from '../components/AlertTodo';

class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      alertToggle: false,
      alertType: null,
    };

    this.handleAlert = this.handleAlert.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const { name, description, alertToggle } = this.state;

    if(name && description) {
      socket.emit('newTodo', { name, description }, (data) => {
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
    const { name, description, alertToggle, alertType } = this.state;
    return (
      <Card bg="dark" text="white">
        <Card.Body>
          <p className="lead"><strong>Create your own todolist</strong></p>
          <AlertTodo type={alertType} method="save" alertToggle={alertToggle} handleAlert={this.handleAlert}></AlertTodo>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" onChange={this.handleChange} value={name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" onChange={this.handleChange} value={description} rows="5" />
            </Form.Group>
            <Button className="mb-5" variant="outline-light" type="submit" block>Save to Todolist <i className="fa fa-check fa-fw"></i></Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default AddTodo;