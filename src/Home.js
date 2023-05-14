import Menu from "./Menu";
import { useState, useEffect, Fragment } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import styled from "styled-components";
import { toast } from 'react-toastify';
import { useHistory, useParams } from "react-router-dom";

const Home = ({userEmail , setUserEmail , username , setUserName}) => {
    const [usernameInput, setusernameInput] = useState('');
    const [emailInput, setemailInput] = useState('');
    const history = useHistory();

    const handleuserOnChange = (e) =>{
        setusernameInput(e.target.value);
    }
    const handleemailOnChange = (e) =>{
        setemailInput(e.target.value);
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        //checking for 'valid' name and email
        if(usernameInput == ''){
            toast.error('Please enter a valid name', {
                position: "top-right",
                autoClose: 1100,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                  })
            return null;
        }
        if( !emailInput.includes('@') || !emailInput.includes('.com')){
            toast.error('Please enter a valid email', {
                position: "top-right",
                autoClose: 1100,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                  })
            return null;
        }
        setUserName(usernameInput);
        setUserEmail(emailInput);
        toast.success('Username and email submitted successfully', {
            position: "top-right",
            autoClose: 1100,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
              })
        let name = 'My Day';
        history.push(`/${name.split(" ").join("-")}/${0}`)
    }


    return ( 
        <Container>
            <MainFrame>
                <LoginText>Welcome</LoginText>
                <form onSubmit={handleSubmit}>
                    <div className="label">USERNAME:</div>
                    <input
                    autoFocus
                    type="text"
                    className="usernameInput"
                    placeholder="Jhon Smith"
                    value={usernameInput}
                    onChange={handleuserOnChange}
                    />
                    <div className="label">EMAIL:</div>
                    <input
                    type="email"
                    className="usernameInput"
                    placeholder="example@company.com"
                    value={emailInput}
                    onChange={handleemailOnChange}
                    />
                    <Button onClick={handleSubmit}>Submit</Button>
                </form>
            </MainFrame>
        </Container>

     );
}
 
export default Home;
    


const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* background-color: red; */
    height: 100%;
    /* justify-content: center; */
    color: #bdbdbd;

    @media (max-width: 700px) {
    /* flex-direction: column; */
        /* margin: auto; */
        /* background-color: red; */
    }

`;

const MainFrame = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(41, 41, 41);
    align-items: center;
    height: 495px;
    width: 30vw;
    border-radius: 4px;
    box-shadow: 4px 4px 32px 0px rgba(0, 0, 0, 0.7);
    .label{
        /* margin-bottom: 4px; */
        font-size: 12px;
        color: rgba(177, 177, 177, 0.3);
        margin: 8px 0px;
    }
    .usernameInput {
    margin: 4px 0px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    font-weight: 500;
    font-size: 15px;
    height: 24px;
    line-height: 100%;
    background-color: #292929;
    border: transparent;
    border-bottom: 1px solid;
    color: #9f9f9f;

    }
    .usernameInput:focus-visible {
        outline: none;
    }
    @media (max-width: 700px) {
        width: 320px;
        height: 520px; 
        margin-top: 120px;
        /* margin-bottom: ; */
    /* flex-direction: column; */
        /* margin: auto; */
        /* background-color: red; */
    }
`;

const LoginText = styled.h1`
    /* align-self: flex-start;
    margin-left: 16px; */
    margin: 3rem 0 1rem 0;
    font-weight: 500;
    /* letter-spacing: 8px; */

`;

const Button = styled.button`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  display: block;
  background-color: #1C1C1C;
  color: #9f9f9f;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 24px 0px;
  outline: 1px solid rgba(255,255,255,0.2);
  border: 2px solid #1C1C1C;
  cursor: pointer;
  @media (max-width: 700px) {
    margin-left: auto;
    margin-right: auto;
  }
`;