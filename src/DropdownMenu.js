import styled from "styled-components";
import { BsList } from "react-icons/bs";
import { useState, useEffect, Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from 'react-toastify';


const DropdownMenu = ({setrenameList,handlePinToStart, handleDuplicate, handleDelete, handleColorChange}) => {
  let { name, index } = useParams();


  const handleButtonClick = (e) => {
      setrenameList(true)
    };

  const pintToStart = (e) => {
    // console.log(index)
    handlePinToStart(index);
  };
  // 1E1E1E
  const [colors, setcolors] = useState([
    "#788CDE",
    "#BC7ABC",
    "#E46C8C",
    "#E46B67",
    "#4AA079",
    "#479E98",
    "#8795A0",
    "#A0CBF1",
    "#D6BDE7",
    "#D80",
  ])




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
                onClick={() => {navigator.clipboard.writeText(`https://xii-a.github.io/${name}/${index}`)
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

                <li className="themes">
                  <div className="textInItem themeText">Themes</div>
                  <ThemeContainer>
                    {
                      colors.map( (color) =>{
                        return(
                          <Square 
                            theme = {color}
                            onClick={() => {handleColorChange(color)}}
                          />

                        )
                      })
                    }
                  </ThemeContainer>
                </li>

                {/* <li className="Menu-Item">
                    <BsList
                    className="icon"
                    size={16}
                    style={{ marginInlineEnd: 4 }}
                  />
                  <div className="textInItem">Email List</div>
                </li> */}

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
        .themes{
          /* height: 100%; */
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background-color: #292929;
          padding: 8px 0px;
          width: inherit;
          
          .themeText{
            margin-left: 8px;
            margin-bottom: 4px;
            font-size: 14px;
          }
          /* align-content: space-between; */
          /* justify-content: space-between; */
        }


        
    }
    
`;
const ThemeContainer = styled.div`
  /* background-color: rgb(5,255,255); */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* column-gap: 8px; */
  

`;
const Square = styled.div`
  cursor: pointer;
  height: 48px;
  width: 48px;
  background-color: ${(props) => props.theme};
  margin-left: 6px;
  margin-top: 8px;
  /* margin-right: 1px; */

  :hover{
      /* background-color: rgba(121, 121, 121, 0.3); */
      box-shadow: 0px 0px 5px 3px rgba(121, 121, 121, 0.5);
      /* border-radius: 0px; */
      
  }
`;

// const Menu-Items

