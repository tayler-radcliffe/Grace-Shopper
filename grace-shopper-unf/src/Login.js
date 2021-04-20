import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Login.css";
import swal from 'sweetalert'


export default function Login({ username, setUsername }) {

    const [password, setPassword] = useState('');

    const history = useHistory();

    const loginUser = async (username, password) => {
        await fetch('http://localhost:3000/api/users/login', {
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
                    swal("Oops", "Username or password incorrect. Please try again.", "error");
                    setUsername('');
                    setPassword('');
                } else {
                    const token = result.token;
                    console.log('This is your login token', token)
                    localStorage.setItem('token', token);
                    swal({
                        title: "Welcome back!",
                        text: "You're logged in!",
                        icon: "success",
                        button: false,
                        timer: 2000
                    });
                    history.push('/account')
                }
            })
            .catch(console.error);
    };



    return (
        <form id="loginform" onSubmit={async (event) => {
            event.preventDefault();
            loginUser(username, password);
        }}>
            <h2 id="headerTitle">Login</h2>
            <div class="row">
                <label>Username</label>
                <input type='text'
                    placeholder='Username'
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div class="row">
                <label>Password</label>
                <input type='password'
                    placeholder='Password'
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div id="button" class="row">
                <button type='submit'>Login</button>
            </div>
            <Link to='/register'>Don't have an account? Sign up here </Link>
        </form>
    )
}
