import './Daxhboard.css';
import Nav from './Nav';
import DetailinTable from './DetailinTable';
import Dashboardform from './model/Dashboardform';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ Email }) => {
    const [show, setShow] = useState(false);
    const [ApiData, setApiData] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:3000/get-production-details')
            .then((res) => {
                const product = res.data.filter(obj => obj.Email === Email);
                setApiData(product);
                // console.log("Fetched data:", product); // Debugging log
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [Email]);

    return (
        <>
            <Nav />
            <table id='customers'>
                <thead>
                    <tr>
                        {/* <th>Name</th>
                        <th>Phone Number</th> */}
                        <th>List of Items</th>
                        <th>Amount</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {ApiData.length > 0 ? (
                        ApiData.map((list, index) => (
                            <DetailinTable key={index} detail={list} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={() => setShow(true)}>Add</button>
            {show && <Dashboardform close={setShow} Email={Email} />}
        </>
    );
};

export default Dashboard;
