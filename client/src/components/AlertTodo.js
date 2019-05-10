import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

const alertCloseStyle = {
  cursor: 'pointer',
  display: 'inline-block', 
  paddingLeft: 6,
};

class AlertTodo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { alertToggle, type, handleAlert, method } = this.props; 
  
    switch (method) {
      case 'save':
        if(type === 'success') {
          return (
            <Alert show={alertToggle} variant={type}>
              <p className="float-right" style={alertCloseStyle} onClick={handleAlert}><i className="fa fa-times fa-fw"></i></p>
              <p style={{marginBottom: -2}}>Todo has been saved.</p>
            </Alert>
          )
        }
        else if(type === 'danger') {
          return (
            <Alert show={alertToggle} variant={type}>
              <p className="float-right" style={alertCloseStyle} onClick={handleAlert}><i className="fa fa-times fa-fw"></i></p>
              <p style={{marginBottom: -2}}>Please fill in all blank fields to save todo.</p>
            </Alert>
          )
        }
        else {
          return null;
        }
        break;
      case 'update':
        if(type === 'success') {
          return (
            <Alert show={alertToggle} variant={type}>
              <p className="float-right" style={alertCloseStyle} onClick={handleAlert}><i className="fa fa-times fa-fw"></i></p>
              <p style={{marginBottom: -2}}>Todo has been updated.</p>
            </Alert>
          )
        }
        else if(type === 'danger') {
          return (
            <Alert show={alertToggle} variant={type}>
              <p className="float-right" style={alertCloseStyle} onClick={handleAlert}><i className="fa fa-times fa-fw"></i></p>
              <p style={{marginBottom: -2}}>Please fill in all blank fields to update todo.</p>
            </Alert>
          )
        }
        else {
          return null;
        }
        break;
      case 'delete':
        if(type === 'success') {
          return (
            <Alert show={alertToggle} variant={type}>
              <p className="float-right" style={alertCloseStyle} onClick={handleAlert}><i className="fa fa-times fa-fw"></i></p>
              <p style={{marginBottom: -2}}>Todo has been deleted.</p>
            </Alert>
          )
        }
        else if(type === 'danger') {
          return (
            <Alert show={alertToggle} variant={type}>
              <p className="float-right" style={alertCloseStyle} onClick={handleAlert}><i className="fa fa-times fa-fw"></i></p>
              <p style={{marginBottom: -2}}>An error occured while deleting todo.</p>
            </Alert>
          )
        }
      default:
        return null;
        break;
    }
  }
}

export default AlertTodo;