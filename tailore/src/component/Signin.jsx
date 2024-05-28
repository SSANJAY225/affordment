import './Login.css';
import { useState } from 'react';
import Axios from 'axios';

const Signup = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Phno, setPhno] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Name, setName] = useState('');
    const [Message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (Password !== ConfirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        Axios.post("http://localhost:3000/newdetail", { Name, Email, Phno, Password })
            .then((response) => {
                console.log(response);
                setMessage('Signup successful!');
            })
            .catch((error) => {
                console.log(error);
                setMessage('Error signing up.');
            });
    };

    return (
        <>
            <div className="box">
                <form onSubmit={handleSubmit}>
                    <div className="innerbox">
                        <h1>Signup</h1>
                        <label>Email: </label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Name: </label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label>Phone Number: </label>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={Phno}
                            onChange={(e) => setPhno(e.target.value)}
                            required
                        />
                        <label>Password: </label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>Confirm Password: </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={ConfirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Signup</button>
                        <a href="/">Already a user</a>
                    </div>
                    <p>{Message}</p>
                </form>
            </div>
        </>
    );
};

export default Signup;
