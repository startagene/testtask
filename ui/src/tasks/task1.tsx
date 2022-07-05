import { useMemo, useState } from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Task1 = () => {
    const [emailsInputValue, setEmailsInputValue] = useState('');
    const [emailsThatAreNotInDb, setEmailsThatAreNotInDb] = useState([]);
    const emailsThatAreNotInDbFormatted = useMemo(() => {
        return emailsThatAreNotInDb.join(', ');
    }, [emailsThatAreNotInDb])

    const onCheckInputClick = async () => {
        const emails = emailsInputValue.split(',').map(email => email.trim());
        const invalidEmail = emails.find(email => !isValidEmail(email));
        if (invalidEmail) {
            alert('Email "' + invalidEmail + '" is invalid. Please fix all emails before proceeding.')
            return;
        }

        const result = await fetch('/api/tasks/CheckEmailsThatAreNotInDb',{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ emails })
        });

        if (result.status === 200) {
            setEmailsThatAreNotInDb(await result.json());
        }
    }

    const onSaveToDbClick = async () => {

        const result = await fetch('/api/tasks/emails',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ emails: emailsThatAreNotInDb })
        });

        if (result.status === 200) {
            alert('Success');
            setEmailsThatAreNotInDb([])
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <label>Please enter your emails, comma separated:</label>
                    <textarea value={emailsInputValue} onChange={e => setEmailsInputValue(e.target.value)} />
                    <button 
                        disabled={!emailsInputValue?.length} 
                        onClick={onCheckInputClick}>
                        Check in database
                    </button>
                </Col>
                <Col>
                    <label>Emails that are not in db</label>
                    <textarea readOnly value={emailsThatAreNotInDbFormatted}></textarea>
                    <button 
                        disabled={!emailsThatAreNotInDb?.length} 
                        onClick={onSaveToDbClick}>
                        Save to database
                    </button>
                </Col>
            </Row>
        </Container>
    )
}

const isValidEmail = (email?: string) => {
    return !!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

export default Task1;