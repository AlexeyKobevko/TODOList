import './AddTodoForm.scss';

import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

export const AddTodoForm = props => {
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errorText, setErrorText] = useState('');

  const validateForm = (str, name) => {
    const regExp = /(^\w.*@\w+\.\w)/;

    if (!str) {
      setErrorText(`Fill in the ${name} field`);
      setTimeout(() => {
        setErrorText('');
      },3000);
      return false;
    }

    if (str && name === 'email' && !regExp.test(str)) {
      setErrorText('Invalid email address');
      setTimeout(() => {
        setErrorText('');
      },3000);
      return false;
    }

    if (str && name === 'email' && regExp.test(str)) {
      setErrorText('');
      return true;
    }

    if (str && name !== 'email') {
      setErrorText('');
      return true;
    }
  };

  const submit = () => {
    if (validateForm(username, 'name') && validateForm(email, 'email') && validateForm(text, 'text')) {
      props.handleSubmit({username, email, text});
      setEmail('');
      setText('');
      setUsername('');
    }
  };

  return (
    <div className="form-wrapper">
      <input className="form-input required"
             name="username"
             type="text"
             value={username}
             placeholder="Name"
             onChange={event => setUsername(event.target.value)}
             required
      />
      <input className="form-input required"
             name="email"
             type="email"
             value={email}
             placeholder="example@email.com"
             onChange={event => setEmail(event.target.value)}
             required
      />
      <input className="form-input required"
             name="text"
             type="text"
             value={text}
             placeholder="Text"
             onChange={event => setText(event.target.value)}
             required
      />
      <button onClick={submit} className="login-btn ">
        <span>Add TODO</span>
      </button>
      {
        errorText &&
        <div className="error-field">
          <span>{errorText}</span>
        </div>
      }
      {
        props.okMessage &&
        <div className="error-field">
          <span>{props.okMessage}</span>
        </div>
      }
    </div>
  );
};