import React, { Component } from 'react';

export class Ui extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    let empArr;
    if (localStorage.getItem('emp') === null) {
      empArr = [];
    } else {
      empArr = JSON.parse(localStorage.getItem('emp'));
    }
    this.setState({
      data: this.props.empData,
    });
  };
  render() {
    return (
      <div className='container bg-muted '>
        {this.props.empData.length ? (
          <table className='table table-responsive-lg table-striped table-dark'>
            <thead>
              <tr>
                <th scope='col'>First Name</th>
                <th scope='col'>Last Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Designation</th>
                <th scope='col'>Edit Employee</th>
                <th scope='col'>Delete Employee</th>
              </tr>
            </thead>
            {this.props.empData.map((emp) => {
              return (
                <tbody>
                  <tr>
                    <td>{emp.fName}</td>
                    <td>{emp.lName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.dep}</td>
                    <td>
                      <button
                        className='btn btn-primary'
                        onClick={this.props.edit}
                        value={emp.id}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-warning'
                        onClick={this.props.delete}
                        value={emp.id}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Ui;
