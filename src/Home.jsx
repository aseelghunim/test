import React, { useState } from 'react';
import Joi from 'joi';
export default function Home() {
    let [errorList, setErrorList] = useState([]);
    let [user, setUser] = useState({
        name: '',
        email: '',
        age: 0,
        password: '',
    });

    function getUserData(e) {
        user[e.target.name] = e.target.value;
    }

    function validation(user) {
        let schema = Joi.object({
            name: Joi.string().min(3).max(20).required(),
            age: Joi.number().min(13).max(50).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(/^[A-Za-z0-9]{8,20}$/),
        });
        return schema.validate(user, { abortEarly: false });
    }

    function submitForm(e) {
        e.preventDefault();
        let validationResult = validation(user);
        if (validationResult.error) {
            setErrorList(validationResult.error.details);
        }
        else {
            console.log('no errors');
        }

    }

    return (

        <div>
            {errorList.map((error) => {
                <div className="alert alert-danger">
                    {error.message}
                </div>
            })}
            <form action="" onSubmit={submitForm}>
                <input type="text" name='name' placeholder='name' onChange={getUserData} />
                <br />
                <input type="email" name='email' placeholder='email' onChange={getUserData} />
                <br />
                <input type="number" name='age' placeholder='age' onChange={getUserData} />
                <br />
                <input type="password" name='password' placeholder='password' onChange={getUserData} />
                <br />
                <input type="submit" />
            </form>
        </div>
    )
}
