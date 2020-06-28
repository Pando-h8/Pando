import React, { useState } from 'react'


const Register = () => {
    const [inputForm, setInputForm] = useState({
        name : '',
        email : '',
        password :''
    })

    const changeInput = (e) => {
        const {name,value} = e.target

        const newInput = {
            ...inputForm,
            [name] : value
        }
        setInputForm(newInput)
        console.log(inputForm);
        
    }

    const submitReg = (e) => {
        e.preventDefault()
        console.log('register!');
        
    }

    return (
        <div className="register">
            <form className="register-form" onSubmit={submitReg}>
                <input  className="input-form" value={inputForm.email} name="email" onChange={changeInput} type="email" placeholder="EMAIL" required />
                <input  className="input-form" value={inputForm.name} name="name" onChange={changeInput} type="text" placeholder="USERNAME" required />
                <input  className="input-form" value={inputForm.password} name="password" onChange={changeInput} type="password" placeholder="PASSWORD" required />
                <input  className="input-btn" type="submit" value="REGISTER" />
            </form>

        </div>
    )
}

export default Register