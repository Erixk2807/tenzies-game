import React from 'react';

const Die = ({value, isHeld}) => {
    return (
        <div className={`die f-c ${isHeld && "die--active"}`}>
            <p className='number'>{value}</p>
        </div>
    );
};

export default Die;