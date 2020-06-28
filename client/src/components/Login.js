import React , {useState} from 'react'
import './Form.css'

const Login = () => {
    const [inputForm, setInputForm] = useState({
        name : '',
        password: ''
    })

    const submitLogin = (e) => {
        e.preventDefault()
        console.log('login!',inputForm);
    }
    
    const changeInput = (e) => {
        const {name,value} = e.target
        
        const newInput = {
            ...inputForm,
            [name] : value
        }

        setInputForm(newInput)
        console.log(inputForm);
        
        
    }
    return(
        <div className="login">
            <form className="login-form" onSubmit={submitLogin}>
                <input className="input-form" value={inputForm.name} name="name" onChange={changeInput} type="text" placeholder="USERNAME" required/>
                <input className="input-form"  value={inputForm.password} name="password" onChange={changeInput} type="password" placeholder="PASSWORD" required/>
                <input className="input-btn" type="submit" value="LOGIN"/>
            </form>

        </div>
    )
}

export default Login