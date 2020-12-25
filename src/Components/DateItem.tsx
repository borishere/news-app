import React from 'react';


export const DateItem: React.FC<{ timestamp: number | undefined }> = ({ timestamp }) => {
    let date;
    let localizedDate;
    let localizedTime;

    if (timestamp) {
        date = new Date(timestamp * 1000);
        localizedDate = date.toLocaleDateString('ru');
        localizedTime = date.toLocaleTimeString('ru');
    }

    return (
        <div>
            <span>{localizedDate}</span>
            <small style={{ marginLeft: '5px' }}>{localizedTime}</small>
        </div>
    )
}