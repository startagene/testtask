import { useMemo, useState } from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Task2 = () => {
    const [task2Data, setTask2Data] = useState([]);
    const task2DataFormatted = useMemo(() => {
        return task2Data.join('\n');
    }, [task2Data])

    const getData = async () => {
        const result = await fetch('/api/tasks/task2Data',{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            },
        });

        if (result.status === 200) {
            setTask2Data(await result.json());
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <textarea readOnly value={task2DataFormatted}></textarea>
                    <button onClick={getData}>Get data</button>
                </Col>
            </Row>
        </Container>
    )
}

export default Task2;