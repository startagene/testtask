import Accordion from 'react-bootstrap/Accordion'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Task1 from './tasks/task1';
import Task2 from './tasks/task2';
import Task7 from './tasks/task7';

import ErrorContext from './ErrorContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';

function App() {
  const [error, setError] = useState<{ message: string } | null>(null);

  const renderError = () => {
    const handleClose = () => {
      setError(null);
    }

    return error && (
      <Modal className='error-modal' show={!!error} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ahhh, you've got an error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="Primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  

  return (
    <ErrorContext.Provider value={{ showError: ({ message }) => setError({ message }) }}>
      {renderError()}
      <div className="App">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Task #1:  Customer provided you a long list of user emails and you need to find from users table which of these emails are not present in the db</Accordion.Header>
            <Accordion.Body>
              <Task1 />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Task #2 FooBar
              <br/>
              Print numbers 1-100 so that if the number can be divided by 3 print Foo (instead of the number); if it can be divided by 5 print Bar (instead of the number)
            </Accordion.Header>
            <Accordion.Body>
              <Task2 />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>
              Task #7 FooBar
              <br/>
              How to rearrange an array so that it starts from a specified element but order otherwise stays the same?
                •  Array contains items “red”, “green”, “yellow”, “blue”, “purple”
                •  We can start the array from yellow (instead of red), ending up with the following array:
                “yellow”, “blue”, “purple”, “red”, “green” (where the order stays)
                Code example:
                var array = new List{'<string> { “red”, “green”, “yellow”, “blue”, “purple” }'}
                var newArray = ChangeStartingPoint (array, “blue”)
                // “blue”, “purple”, “red”, “green”, “yellow”

            </Accordion.Header>
            <Accordion.Body>
              <Task7 />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </ErrorContext.Provider>
  );
}

export default App;
