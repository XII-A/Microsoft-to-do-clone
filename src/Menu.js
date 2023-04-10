import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import { BsCircle } from "react-icons/bs";
import { BsList } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import styled from "styled-components";
import { toast } from 'react-toastify';
const Menu = ({
  data,
  setData,
  filteredData,
  setFilteredData,
  paramindex,
  setParamindex,
  username,
  userEmail,
}) => {
  const [searchVal, setsearchVal] = useState("");

  const [inputVal, setinputVal] = useState("");
  const [isclicked, setclicked] = useState(false);

  // let { name, paramindex } = useParams();
  // const [paramindex, setParamindex] = useState(null);

  const changeIndex = (index) => {
    setParamindex(index);
    // console.log(`${paramindex} wtf`);
  };

  let prevIndex = null;

  useEffect(() => {
    console.log("triggered ef");
    setFilteredData(
      data.filter((x) => x.toLowerCase().includes(searchVal.toLowerCase()))
    );

    //new database
    // console.log(listTask.filter((x) => x.name.toLowerCase().includes(searchVal.toLowerCase())));
    // setFilteredData(listTask.filter((x) => x.name.toLowerCase().includes(searchVal.toLowerCase())));

  }, [searchVal, data]);

  useEffect(() => {
    console.log("focus use effect trig");
    if (paramindex != null) {
      handleFocus();
    }
  }, [paramindex]);

  const handleFocus = () => {
    // if(prevIndex != null){
    //   var prevElem = document.getElementById(prevIndex);
    //   prevElem.classList.toggle("focusStyle");
    // }
    // let elem = document.getElementById(paramindex);
    // elem.classList.toggle("focusStyle");
    // prevIndex = paramindex;
    let elem = document.getElementsByClassName("focusStyle");
    for (let index = 0; index < elem.length; index++) {
      elem[index].classList.toggle("focusStyle");
    }
    if (paramindex != -1) {
      elem = document.getElementById(paramindex);
      elem.classList.toggle("focusStyle");
    }
  };

  const handleOnChange = (e) => {
    setsearchVal(e.target.value);
  };
  const handleOnInput = (e) => {
    setinputVal(e.target.value);
  };
  const handleClick = (e) => {
    setclicked(true);
    console.log(isclicked);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal != "" && !data.includes(inputVal)) {
      setData((prev) => {
        return [...prev, inputVal];
      });
      setinputVal("");
      setclicked(false);
    } else {
      if(data.includes(inputVal)){
        toast.error('This name already exists', {
          position: "top-right",
          autoClose: 1100,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
            })
      }else{
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

      }
    }
  };

  return (
    <Content>
      <MainContent>
        <NavHeader className="nav-header">
          <BsCircle size={40} style={{ marginInlineEnd: 12 }} className="userIcon" />
          <div className="userContainer">
            <div className="username">{username}</div>
            <div className="email">{userEmail}</div>
          </div>

        </NavHeader>

        <SearchFilter className="filter">
          {/* TODO:Add logic to the search input */}
          <input
            type="search"
            className="filter-input"
            placeholder="Search"
            value={searchVal}
            onChange={handleOnChange}
          />
        </SearchFilter>

        <MenuItems>
          {filteredData.map((x, index) => {
            
            return (
              <Link
                to={`/${x.split(" ").join("-")}/${index}`}
                className="Links"
                onClick={() => changeIndex(index)}
              >
                <div className="menu-item" id={index}>
                  <BsList
                    className="icon"
                    size={24}
                    style={{ marginInlineEnd: 4 }}
                  />
                  <div className="textInItem">{x}</div>
                </div>
              </Link>
            );
          })}
        </MenuItems>
      </MainContent>

      {!isclicked && (
        <Button onClick={handleClick}>
          <NewList className="Newlisto">
            <AiOutlinePlus size={24} className="icon-plus" />
            <div className="newListText">New list</div>
          </NewList>
        </Button>
      )}

      {isclicked && (
        <InputName className="filter">
          <BsList className="icon" size={24} style={{ marginInlineEnd: 0 }} />
          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              className="listName-input"
              placeholder="List Name"
              value={inputVal}
              maxlength="15"
              onChange={handleOnInput}
            />
          </form>
        </InputName>
      )}
    </Content>
  );
};

export default Menu;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  background-color: #292929;
  width: 220px;
  color: #bdbdbd;
  padding: 0px 4px;
`;
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: #292929;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 3px solid transparent;
    background-clip: content-box;
    background-color: #a0a0a0;
  }
`;

const NavHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  .userIcon{
    padding-top: 2px;    
  }
  .userContainer{
    display: flex;
    flex-direction: column;
    
    .username {
    font-size: 18px;
    font-weight: 500;
    }
    .email{
      font-size: 12px;
    }
    

  }
`;

const SearchFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0px 16px;
  .filter-input {
    /* margin: 0px 10px; */
    margin-top: 32px;
    height: 22px;
    width: 100%;
    background-color: #1c1c1c;
    border: transparent;
    border-bottom: 0.5px solid #9f9f9f;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    color: #9f9f9f;
  }
  .filter-input:focus-visible {
    outline: none;
    border-bottom: 0.5px solid #80b2ff;
  }
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  /* margin-left: 4px; */
  /* margin-right: 4px; */
  /* padding: 8px 0px; */

  margin-top: 12px;
  .icon {
  }
  .menu-item {
    /* padding: 0px 2px; */
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 12px;
    padding: 8px 0px;
    width: 100%;
  }
  .menu-item:hover {
    background-color: rgba(121, 121, 121, 0.3);
    border-radius: 2px;
  }
  .focusStyle {
    background-color: rgba(121, 121, 121, 0.3);
    border-radius: 2px;
  }
  .textInItem {
    line-height: 100%;
  }
  .Links {
    text-decoration: none;
    color: inherit;
    padding: inherit;
    width: 100%;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
    }
  }
`;

const NewList = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;

  width: 100%;
  padding: 8px 0px;
  .newListText {
    line-height: "100%";
  }
  :hover {
    background-color: rgba(121, 121, 121, 0.3);
    border-radius: 2px;
  }
  .icon-plus {
    margin-right: 4px;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #9f9f9f;
  padding: 0px;
`;

const InputName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .listName-input {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    font-weight: 500;
    font-size: 15px;
    height: 24px;
    line-height: 100%;
    background-color: #292929;

    border: transparent;
    color: #9f9f9f;
  }
  .listName-input:focus-visible {
    outline: none;
  }
`;
