import React, { useState } from 'react';
import FormInput from '../FormInput/FormInput.component';
import './SignUp.styles.scss';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [success, setSuccess] = useState(false);

    const isValidEmail = () => {
        if(email) {
            const payload = {
                "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
                "data": {
                    "email": `${email}`,
                }
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            };
            fetch('https://api.raisely.com/v3/check-user', requestOptions)
                .then(response => response.json())
                .then(data => data.data.status === 'OK' ? setValidEmail(true) : setValidEmail(false));
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        isValidEmail();
        if(password === confirmPassword && validEmail === true){
            const payload = {
                "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
                "data": {
                    "firstName": `${firstName}`,
                    "lastName": `${lastName}`,
                    "email": `${email}`,
                    "password": `${password}`
                }
            };
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            };
            fetch('https://api.raisely.com/v3/signup', requestOptions)
                .then(response => response.json())
                .then(data => data.message === 'Thank you for joining!' ? setSuccess(true) : setSuccess(false));
        }

        if(() => success) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }

    }

    return (
        <div className="sign-up">
            <h1 className="title">Create Account</h1>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput 
                    type='text'
                    name='firstName'
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    onClick={() => setSuccess(false)}
                    label='First Name'
                    required
                />
                <FormInput 
                    type='text'
                    name='lastName'
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    label='Last Name'
                    required
                />
                <FormInput 
                    type='email'
                    name='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    label='Email'
                    required
                />
                {
                    !validEmail && email.length > 0 
                    ?   <p className="email-invalid">Invalid Email</p>
                    :   <p></p>
                }
                <FormInput 
                    type='password'
                    name='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onClick={isValidEmail}
                    label='Password'
                    required
                />
                <FormInput 
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    label='Confirm Password'
                    required
                />
                {
                    password !== confirmPassword && confirmPassword.length > 0
                    ?   <p className="verify-password-match">Password doesn't match</p>
                    :   <p></p>
                }
                <div className="sign-up-button-container">
                    <button
                        className={`${firstName.length
                                    && lastName.length
                                    && email.length
                                    && password.length
                                    && confirmPassword.length
                                    && password === confirmPassword
                                    && isValidEmail
                                    ?   'enable-sign-up-button'
                                    :   ''}sign-up-button`}
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
                {
                    success
                    ?   <h1 className="success-message">Signup Successful</h1>
                    :   <p></p>
                }
            </form> 
        </div>
    )
}

export default SignUp;