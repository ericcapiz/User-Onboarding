import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import axios from 'axios'

const FormCont = styled.form `
display: flex;
flex-direction: column;
align-items: center;
background-color: teal;
padding: 20px;

label{
    margin: 0px 0px 15px 0px;
    align-items: center;
}
input{
    padding: 10px;
}
button{
    width: 200px;
    padding: 8px 15px 8px 15px;
	background: #FF8500;
	color: #fff;
	box-shadow: 1px 1px 4px #DADADA;
	-moz-box-shadow: 1px 1px 4px #DADADA;
	-webkit-box-shadow: 1px 1px 4px #DADADA;
	border-radius: 3px;
	-webkit-border-radius: 3px;
    -moz-border-radius: 3px;

}

input[type=text],input[type=password]{
border: none;
	padding: 8px 15px 8px 15px;
	background: #FF8500;
	color: #fff;
	box-shadow: 1px 1px 4px #DADADA;
	-moz-box-shadow: 1px 1px 4px #DADADA;
	-webkit-box-shadow: 1px 1px 4px #DADADA;
	border-radius: 3px;
	-webkit-border-radius: 3px;
    -moz-border-radius: 3px;
}
`;
const ErrorMsg = styled.p `

  font-size: 1.2rem;
  color: red;

`;
const Form = ()=>{
//set initial form state
const [formState, setFormState] = useState({
  name: "",
  email: "",
  password: "",
  terms: true
});

//button disabled state
const [buttonDisabled, setButtonDisabled] = useState(true);

//errors state
const [errors, setErrors] = useState({
  name: "",
  email: "",
  password: "",
  terms: ""
});


const [post, setPost] = useState([]);

const validateChange = (e) => {
  

  yup
    .reach(formSchema, e.target.name)
    .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
    .then((valid) => {

      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    })
    .catch((err) => {
      console.log(err);

      
      setErrors({
        ...errors,
        [e.target.name]: err.errors[0]
      });
    });
};
// onSubmit function
const formSubmit = (e) => {
  e.preventDefault(); 

  axios
    .post("https://reqres.in/api/users", formState)
    .then((res) => {
      
      // update temp state with value from API to display in <pre>
      setPost(res.data);
      setFormState({
        name: "",
        email: "",
        password:"",
        terms: true
      });
    })
    .catch((err) => {});
};

// onChange function
const inputChange = (e) => {
  e.persist();
  const newFormData = {
    ...formState,
    [e.target.name]:
      e.target.type === "checkbox" ? e.target.checked : e.target.value
  };

  validateChange(e);
  setFormState(newFormData);
};

// schema used for all validation to determine whether the input is valid or not
const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"), // must include name or else error
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Must include an email"), // must have string present, must be of the shape of an email
  password: yup.string().required("Please enter a password"),
  terms: yup.boolean().oneOf([true], "Please agree to Terms & Conditions")
});

// whenever state updates, validate the entire form. if valid, then change button to be enabled.
useEffect(() => {
  formSchema.isValid(formState).then((isValid) => {
    setButtonDisabled(!isValid);
  });
}, [formState]);

   
    return(
<FormCont onSubmit={formSubmit}>
<label htmlFor="name">
        Name:
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Name" 
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name.length > 0 ? <ErrorMsg>{errors.name}</ErrorMsg> : null}
    </label>
    <label htmlFor="email">
        Email:
        <input
          id="email"
          type="text"
          name="email"
          placeholder="Email" 
          value={formState.email}
          onChange={inputChange}
        />
        {errors.email.length > 0 ? <ErrorMsg>{errors.email}</ErrorMsg > : null}
    </label>
    <label htmlFor="password">
        Password:
        <input 
        id="password" 
        type="password"
        placeholder="Password" 
        name="password" 
        value={formState.password}
        onChange={inputChange} />
        {errors.password.length > 0 ? <ErrorMsg>{errors.password}</ErrorMsg > : null}
    </label>
    <label htmlFor="terms">
        Terms of Service:
        <input 
        id="terms" 
        type="checkbox" 
        name="terms" 
        checked={formState.terms}
        onChange={inputChange}/>
        {errors.terms.length > 0 ?
          <ErrorMsg>{errors.terms}</ErrorMsg>
        : null}
    </label>
    <button disabled={buttonDisabled}>Submit</button>
    <pre>{JSON.stringify(post, null, 2)}</pre>
</FormCont>
    )
}

export default Form;