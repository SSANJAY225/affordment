import React from 'react';
import './Daxhboard.css';

const DetailinTable = (props) => {
    const { detail } = props;

    // Debugging logs
    // console.log('Detail prop:', detail);

    // Check if detail and detail.listoditm are defined
    if (!detail || !detail.Listofitm) {
        return (
            <tr>
                <td colSpan="5">No data available</td>
            </tr>
        );
    }

    const entries = Object.entries(detail.Listofitm);

    return (
        <tr>
            <td>
                {entries.map(([key, value], index) => (
                    <div key={index}>{key}: {value}</div>
                ))}
            </td>
            <td>{detail.Amt}</td>
            <td><button>Pay</button></td>
        </tr>
    );
};

export default DetailinTable;
