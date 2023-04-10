import styled from "styled-components";
import { BsList } from "react-icons/bs";
import { useState, useEffect, Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from 'react-toastify';


const DropdownMenu = ({setrenameList,handlePinToStart, handleDuplicate, handleDelete}) => {
  let { name, index } = useParams();


  const handleButtonClick = (e) => {
      setrenameList(true)
    };

  const pintToStart = (e) => {
    // console.log(index)
    handlePinToStart(index);
  };




    return ( 
        <Container>
            <ul className="Menu-Items">

                <li className="Menu-Item" id="1'st" onClick={handleButtonClick}>
                    <BsList
                    className="icon"
                    size={16}
                    style={{ marginInlineEnd: 4 }}
                  />
                  <div className="textInItem">Rename List</div>
                </li>

                <li className="Menu-Item" 
                onClick={() => {navigator.clipboard.writeText(`http://localhost:3000/${name}/${index}`)
                                toast.success('Link copied to clipboard', {
                                    position: "top-right",
                                    autoClose: 1100,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                      })
                }}>
                    <BsList
                    className="icon"
                    size={16}
                    style={{ marginInlineEnd: 4 }}
                  />
                  <div className="textInItem">Share List</div>
                </li>

                <li className="Menu-Item">
                    <BsList
                    className="icon"
                    size={16}
                    style={{ marginInlineEnd: 4 }}
                  />
                  <div className="textInItem">Print List</div>
                </li>

                <li className="Menu-Item">
                    <BsList
                    className="icon"
                    size={16}
                    style={{ marginInlineEnd: 4 }}
                  />
                  <div className="textInItem">Email List</div>
                </li>

                <li className="Menu-Item" onClick = {pintToStart}>
                    <BsList
                    className="icon"
                    size={16}
                    style={{ marginInlineEnd: 4 }}
                    />
                  <div className="textInItem">Pin to Start</div>
                </li>

                <li className="Menu-Item" onClick={() => {handleDuplicate(index)}}>
                    <BsList
                    className="icon"
                    size={16}
                    style={{ marginInlineEnd: 4 }}
                  />
                  <div className="textInItem">Duplicate List</div>
                </li>

                <li className="Menu-Item" onClick={() => handleDelete(index)}>
                    <BsList
                    className="icon"
                    size={16}
                    style={{ marginInlineEnd: 4 }}
                  />
                  <div className="textInItem">Delete List</div>
                </li>

            </ul>

        </Container>
     );
}
 
export default DropdownMenu;


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #bdbdbd;
    font-size: 16px;
    font-weight: 400;
    background-color: #292929;
    width: 224px;
    
    border: 1px solid rgba(121, 121, 121, 0.4);
    border-radius: 4px;
    /* height: fit-content; */
    .Menu-Items{
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: flex-start;
        background-color: #292929;
        
        padding-inline-start: 0px;
        margin: 0px;
        width: 100%;
        
        
        .Menu-Item{
            height: 100%;

            cursor: pointer;
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: #292929;
            padding: 8px 0px;
            width: inherit;
            .icon{
                margin-left: 8px;
            }
            .textInItem{
                margin-left: 4px;
                margin-bottom: 4px;
            }
            :hover{
                background-color: rgba(121, 121, 121, 0.3);
                border-radius: 0px;
            }
        }
    }
    

`;

// const Menu-Items

