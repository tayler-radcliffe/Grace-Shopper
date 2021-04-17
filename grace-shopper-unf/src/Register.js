import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";
import swal from 'sweetalert'
import { useHistory } from "react-router-dom";

export default function Register({ username, setUsername }) {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const history = useHistory();

    const registerUser = async (username, password) => {
        await fetch('http://localhost:3000/api/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.error) {
                    if (result.error.name === 'PasswordTooShortError') {
                        swal("Oops", "Password must be at least 8 characters. Please try again.", "error");
                    } else if (result.error.name === "UserExistsError") {
                        swal("Oops", "A user by that username already exists.", "error");
                        setUsername('');
                        setPassword('');
                        setConfirmPassword('');
                    }
                } else if (result.token) {
                    swal({
                        title: "Welcome!",
                        text: "You've registered successfully!",
                        icon: "success",
                        button: false,
                        timer: 2000
                    });
                    const token = result.token;
                    console.log('This is your register token', token);
                    localStorage.setItem('token', token);
                    setUsername('');
                    setPassword('');
                    setConfirmPassword('');

                    history.push('/account')
                }
            })
            .catch(console.error);
    };


    return (
        <form id="loginform" onSubmit={async (event) => {
            event.preventDefault();
            if (password !== confirmPassword) {
                swal("Oops", "Passwords must match.", "error");
            } else {
                registerUser(username, password)
            }
        }}>
            <h2 id="headerTitle">Register</h2>
            <div class="row">
                <label>Username</label>
                <input required
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div class="row">
                <label>Password</label>
                <input type='password'
                    placeholder='Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div class="row">
                <label>Confirm Password</label>
                <input type='password'
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div id="button" class="row">
                <button type='submit'>Register</button>
            </div>
            <Link to='/login'>Already have an account? Sign in here </Link>
        </form>
    )
}
