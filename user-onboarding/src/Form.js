import React, { useState } from 'react';
import styled from 'styled-components';

const FormCont = styled.form `
display: flex;
flex-direction: column;
align-items: center;
background-color: teal;
padding: 20px;
width: 500px;

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

input[type=text]{
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

const Form =()=>{
    const [name, setName] = useState('')
    return(
<FormCont>
    <label>
        Name:
        <input type="text" placeholder="Name"/>
    </label>
    <label>
        Email:
        <input type="text" placeholder="Email"/>
    </label>
    <label>
        Password:
        <input type="text" placeholder="Password"/>
    </label>
    <label>
        Terms of Service:
        <input type="checkbox" />
    </label>
    <button>Submit</button>

</FormCont>
    )
}

export default Form;