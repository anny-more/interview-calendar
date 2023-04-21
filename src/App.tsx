import React, { useState } from 'react';
import {getWeek} from './modules/getWeek';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin: 0 auto;
    max-width: 720px;
    min-width: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2rem;
    color: red;
`;

const Calendar = styled.div`
    display: flex;
    flex-direction: row:
    align-items: stretch;
    justify-content: space-evenly;
    width: 100%;
    padding: 10px;

`;
const Day = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

`;

function App (): JSX.Element {
    const [dateInfo, setDate] = useState(getWeek.setWeek());

    return (
        <Wrapper>
            <Calendar>
                <Day></Day>
                {dateInfo.map(({item, day, date}) => {
                    return (
                        <>
                            <Day key={item.toString()}>
                                <div>{day}</div>
                                <div>{date}</div>
                            </Day>
                        </>
                    );
                })}
            </Calendar>
            <Calendar>
                <button onClick={() => {setDate(getWeek.getDayBefore());}}>Prev</button>
                <div>{dateInfo[0].month}  {dateInfo[0].year}</div>
                <button onClick={() => {setDate(getWeek.getDayAfter());}}>Next</button>
            </Calendar>
        </Wrapper>
    );
}

export default App;
