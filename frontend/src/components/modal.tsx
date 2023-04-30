import { useEffect, useState } from "react";
import styled from "styled-components";
import { timeSlots } from "../modules/const";

const Modal = styled.div<{visible: Boolean}>`
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
    position: fixed;
    top: 0;
    width: max-content;  
    height: max-content;
    margin: 20px;
    background-color: white;
    border-radius: 10px;
    z-index: 2;
`;
const ModalForm = styled.form`
    max-width: 100vw;
    width: 720px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px;
`;
export default function Form({visible, setVisible} : {visible: Boolean, setVisible: Function}) {
    const [newEvent, setNewEvent] = useState({date: '', time: ''});
    const [isDisabled, setStatus] = useState(true);

    const onSubmit = (event: { preventDefault: () => void; }) => {
        console.log(newEvent);
        const data = {date_interview: newEvent.date, slot: newEvent.time}
        fetch('http://localhost:3001/api/addSlot', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => console.log(response));
        event.preventDefault();
    }
    useEffect(() => {
        (newEvent.date && newEvent.time) ? setStatus(false) : setStatus(true);
    }, [newEvent.date, newEvent.time] 
    )
    return (
            <Modal visible={visible}>
                <ModalForm onSubmit={onSubmit}>
                <h5>Добавить встречу</h5>
                    <label>
                        Дата
                        <br/>
                        <input type='date' value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}/>
                    </label>
                    <br/>
                    <label>
                    Время
                    <br/>
                        <select value={newEvent.time} onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}>
                            {timeSlots.map(item => {
                                return (
                                    <option value={item}>{item}</option>
                                )
                            }) }
                        </select>
                    </label>
                    <br/>
                    
                    <button onClick={() => setVisible(false)}>Отмена</button>
                    <button disabled={isDisabled} type='submit'>Добавить</button>
                </ModalForm>
            </Modal>
    );
}
