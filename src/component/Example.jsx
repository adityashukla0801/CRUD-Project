import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import Ui from './Ui';

function Example() {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [data, setData] = useState([]);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [mail, setMail] = useState('');
  const [deg, setDeg] = useState('');
  const [id, setId] = useState('');
  const [flag, setFlag] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setFlag(false);
    setFirst('');
    setLast('');
    setMail('');
    setDeg('');
  };

  function storeData() {
    if (firstName == '' || lastName == '' || email == '' || designation == '') {
      swal('Warning!', 'Please Enter All Values!', 'warning');
    } else {
      if (!flag) {
        let empArr;
        let cnt;
        if (localStorage.getItem('emp') === null) {
          empArr = [];
          cnt = 1;
        } else {
          empArr = JSON.parse(localStorage.getItem('emp'));
          cnt = empArr[empArr.length - 1].id + 1;
        }
        let obj = {
          id: cnt,
          fName: firstName,
          lName: lastName,
          email: email,
          dep: designation,
        };
        empArr.push(obj);
        localStorage.setItem('emp', JSON.stringify(empArr));
        setData(empArr);
        setFirstName('');
        setLastName('');
        setEmail('');
        setDesignation('');
      } else {
        const empArr = JSON.parse(localStorage.getItem('emp'));
        let obj = {
          id: id,
          fName: first,
          lName: last,
          email: mail,
          dep: deg,
        };
        let newArr = empArr.map((ele) => {
          if (ele.id == obj.id) {
            console.log('object');
            return obj;
          }
          return ele;
        });
        localStorage.setItem('emp', JSON.stringify(newArr));
        setData(newArr);
      }
    }
  }

  const editEmployee = (e) => {
    handleShow();
    setFlag(true);
    let empArr;
    if (localStorage.getItem('emp') === null) {
      empArr = [];
    } else {
      empArr = JSON.parse(localStorage.getItem('emp'));
    }
    empArr.forEach((element) => {
      if (e.target.value == element.id) {
        setId(element.id);
        setFirst(element.fName);
        setLast(element.lName);
        setMail(element.email);
        setDeg(element.dep);
        setFirstName(element.fName);
        setLastName(element.lName);
        setEmail(element.email);
        setDesignation(element.dep);
      }
    });
  };

  const deleteEmployee = (event) => {
    let empArr;
    if (localStorage.getItem('emp') === null) {
      empArr = [];
    } else {
      empArr = JSON.parse(localStorage.getItem('emp'));
    }
    let temp = empArr.filter((ele) => event.target.value != ele.id);
    localStorage.setItem('emp', JSON.stringify(temp));
    setData(JSON.parse(localStorage.getItem('emp')));
    if (temp.length == 0) {
      localStorage.clear('emp');
    }
  };

  useEffect(() => {
    let empArr;
    if (localStorage.getItem('emp') === null) {
      empArr = [];
    } else {
      empArr = JSON.parse(localStorage.getItem('emp'));
    }
    setData(empArr);
  }, []);

  return (
    <div className=''>
      <h1 className='border-bottom border-danger text-center p-2 bg-main'>Employee Management System</h1>
        <div className='overlay text-center d-flex align-items-center justify-content-center' style={{height:'80vh'}}>
          <div >
          <h1 className='display-3 my-3'>Add employees with ease</h1>
          <h4>Tracking employee data and records has been easier.GET START</h4>
          <button className='my-5 py-2 px-4 bg-main' variant='primary' onClick={handleShow}>
            Add Employee
          </button>
          </div>
          

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Enter Employee details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='d-flex'>
                <div className='mx-2'>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text' id='basic-addon1'>
                        First Name
                      </span>
                    </div>
                    <input
                      type='text'
                      className='form-control'
                      value={first}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setFirst(e.target.value);
                      }}
                      placeholder='Enter...'
                    />
                  </div>
                </div>
                <div className='mx-2'>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text' id='basic-addon1'>
                        Last Name
                      </span>
                    </div>
                    <input
                      type='text'
                      className='form-control'
                      value={last}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setLast(e.target.value);
                      }}
                      placeholder='Enter...'
                    />
                  </div>
                </div>
              </div>
              <div className='mx-2'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text' id='basic-addon1'>
                      Email
                    </span>
                  </div>
                  <input
                    type='text'
                    className='form-control'
                    value={mail}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setMail(e.target.value);
                    }}
                    placeholder='Enter...'
                  />
                </div>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <label className='input-group-text'>Designation</label>
                  </div>
                  <select
                    className='custom-select'
                    value={deg}
                    onChange={(e) => {
                      setDesignation(e.target.value);
                      setDeg(e.target.value);
                    }}
                    id='inputGroupSelect01'
                  >
                    <option value=''>Choose... </option>
                    <option value='Front-End Developer'>
                      Front-End Developer
                    </option>
                    <option value='Back-End Developer'>
                      Back-End Developer
                    </option>
                    <option value='Fullstack Developer'>
                      Fullstack Developer
                    </option>
                  </select>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button
                variant='primary'
                onClick={() => {
                  handleClose();
                  storeData();
                }}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      
      <Ui empData={data} delete={deleteEmployee} edit={editEmployee} />
    </div>
  );
}

export default Example;
