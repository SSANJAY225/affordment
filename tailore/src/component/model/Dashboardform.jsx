import './Dashboardform.css';
import { useState } from 'react';
import Axios from 'axios';

const Dashboardform = ({ close, Email }) => {
    const [dr1, setDr1] = useState(0);
    const [dr2, setDr2] = useState(0);
    const [dr3, setDr3] = useState(0);
    const [message, setMessage] = useState('');
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const Listofitm = {
                dir1: dr1,
                dir2: dr2,
                dir3: dr3
            };
            const Amt = (dr1 * 2) + (dr2 * 2) + (dr3 * 2);
            
            const response = await Axios.post("http://localhost:3000/additem", { Email, Listofitm, Amt, date });
            
            setMessage('Added successfully!');
            close(false);
        } catch (error) {
            console.error(error);
            setMessage("error in adding");
        }
    };

    return (
        <div className='modal'>
            <div className='form'>
                <div className='close' onClick={() => close(false)}>&times;</div>
                <div className="title">Add Product</div>
                <form onSubmit={handleSubmit}>
                    <div className="content">
                        <label>dr1</label>
                        <input
                            type="number"
                            placeholder='No.of dr1'
                            value={dr1}
                            onChange={(e) => setDr1(Number(e.target.value))}
                        />
                        <label>dr2</label>
                        <input
                            type="number"
                            placeholder='No.of dr2'
                            value={dr2}
                            onChange={(e) => setDr2(Number(e.target.value))}
                        />
                        <label>dr3</label>
                        <input
                            type="number"
                            placeholder='No.of dr3'
                            value={dr3}
                            onChange={(e) => setDr3(Number(e.target.value))}
                        />
                    </div>
                    <div className="footer">
                        <button type="submit">Add</button>
                        <button type="button" onClick={() => close(false)}>Close</button>
                    </div>
                    <p>{message}</p>
                </form>
            </div>
        </div>
    );
};

export default Dashboardform;
