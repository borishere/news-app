import React from 'react';

export const DateItem = ({ timestamp }) => {
    const date = new Date(timestamp * 1000);
    const localizedDate = date.toLocaleDateString('ru');
    const localizedTime = date.toLocaleTimeString('ru');


    return (
        <div>
            <span>{localizedDate}</span>
            <small style={{ marginLeft: '5px' }}>{localizedTime}</small>
        </div>
    )
}