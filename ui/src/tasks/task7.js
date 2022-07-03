import { useMemo, useState } from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Task1 = () => {
    const [arrayInputValue, setArrayInputValue] = useState('');
    const [newStartingIndex, setNewStartingIndex] = useState(0);
    const [arrayRearranged, setArrayRearranged] = useState([]);
    const arrayRearrangedFormatted = useMemo(() => {
        return arrayRearranged.join(', ');
    }, [arrayRearranged])

    const onRearrange = async () => {
        const array = arrayInputValue.split(',').map(email => email.trim());
       
        const result = await fetch('/api/tasks/rearrangeArray',{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ array, newStartingIndex })
        });

        if (result.status === 200) {
            setArrayRearranged(await result.json());
        }
    }


    return (
        <Container>
            <Row>
                <Col>
                    <label>Please enter your array, comma separated:</label>
                    <textarea value={arrayInputValue} onChange={e => setArrayInputValue(e.target.value)} />
                    <input value={newStartingIndex} onChange={e => setNewStartingIndex(parseInt(e.target.value))} type='number'/>
                    <button 
                        disabled={!arrayInputValue?.length} 
                        onClick={onRearrange}>
                        Set index to be a new starting point
                    </button>
                </Col>
                <Col>
                    <label>Rearranged array:</label>
                    <textarea readOnly value={arrayRearrangedFormatted}></textarea>
                </Col>
            </Row>
        </Container>
    )
}

export default Task1;