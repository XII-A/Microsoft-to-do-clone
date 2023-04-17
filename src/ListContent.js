import styled from "styled-components";
import { useState, useEffect, Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BsList, BsThreeDots } from "react-icons/bs";
import DropdownMenu from "./DropdownMenu";
import { GrCheckbox } from "react-icons/gr";
import { GiSquare } from "react-icons/gi";
import { BsCheck2Square,BsPlusSquare } from "react-icons/bs";
import { toast } from 'react-toastify';
import { MdOutlineKeyboardArrowRight,MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
const ListContent = ({ data, setData ,paramindex,setParamindex}) => {
  const history = useHistory();

  let { name, index } = useParams();

  

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let year = date.getFullYear();


  const [openMenu, setopenMemu] = useState(false);

  const [renameList, setrenameList] = useState(false);
  
  const [newName, setnewName] = useState("");

  const [pinToStart , setpintToStart] = useState(null);
  
  //for adding a task------------------------
  
  const [isclicked, setclicked] = useState(false); 
  const [taskInput, setTaskInput] = useState("");

  const [cTaskTog, setcTaskTog] = useState(false);
  
  const handleClick = (e) => {
    setclicked(true);
    console.log(isclicked);
  };

  const handleOnTaskInput = (e) => {
    setTaskInput(e.target.value);
  };



  //----------------------------------------------------
  const [menuopen, setMenuOpen] = useState(false);

  const [funCalled,setFunCalled] = useState(false);



//TASKS RELATED FUNCTIONS-----------------------------------------------------------------------
  //setting up tasks 
  const [tasks , setTasks] = useState(() => {
    let tasksList = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const taskElement = {
        name: element,
        // uncTasks:["This is the 1'st task delete","This is the 2'nd task","This is the 1'st task","This is the 2'nd task","This is the 1'st task","This is the 2'nd task","This is the 1'st task","This is the 2'nd task","This is the 1'st task","This is the 2'nd task","This is the 1'st task","This is the 2'nd task","This is the 1'st task","This is the 2'nd task","This is the 1'st task","This is the 2'nd task","This is the 1'st task","This is the 2'nd task","This is the 1'st task","This is the 2'nd task"],
        uncTasks:[
          {
            text:'this is task 1 for today',
            hover: false
          },
          {
            text:'this is task 2 for today',
            hover: false
          },

        ],
        cTasks:["this is the 1'st task you have done","this is the 2'nd task you have done"],
        
          
      }
      tasksList.push(taskElement);
    }
    return tasksList;
  });

  //editing tasks in case of a change in menu data
  useEffect(() => {

    let newTaskList = tasks;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if(newTaskList.find(item => item.name == element)){
        //do nothing
      }else{
        const taskElement = {
          name: element,
          uncTasks:[
            {
              text:'this is task 1 for today',
              hover: false
            },
            {
              text:'this is task 2 for today',
              hover: false
            },

          ],
          cTasks:["this is the 1'st task you have done","this is the 2'nd task you have done"]
        }
        newTaskList.push(taskElement)
      }
    }
    setTasks(newTaskList);
  }, [data])


  // function to find what list of tasks we are in
  const currentTaskList = () =>{
    let foundtask = null;
    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];
      if(element.name == name.split('-').join(' ')){
        foundtask = element;
        return index;
      }else{
      }
      
    }
    return 0;
  };

  useEffect(()=>{

  },[funCalled])
//-------------------------------------------------------------------------------------------
// make a task uncomplete again

  const makeUncomplete = (indexoftask) =>{
    let newTaskList = tasks.slice();//so react would see it as a change in state
    let changeIndex = currentTaskList()
    for (let index = 0; index < tasks.length; index++) {
      if(index != changeIndex){
      }else{
        console.log('index of task is =>')
        console.log(indexoftask)
        const x = newTaskList[changeIndex].cTasks.splice(indexoftask,1);
        console.log(x)
        const text = x[0]; //The reason for [0] is so js wouldnt consider it undefined -- I hate js so much 
        console.log(text);
        let newObj = 
        {
          text: text,
          hover: false
        };
        newTaskList[changeIndex].uncTasks.push(newObj);

        
      }
    }
    setTasks(newTaskList);
  }

//Handling task modification from uncomplete list to complete list-----------------------------------
  const handleTaskClick = (indexoftask) => {

    let newTaskList = tasks.slice();//so react would see it as a change in state
    let changeIndex = currentTaskList()
    for (let index = 0; index < tasks.length; index++) {
      if(index != changeIndex){
      }else{
        console.log('index of task is =>')
        console.log(indexoftask)
        const x = newTaskList[changeIndex].uncTasks.splice(indexoftask,1);
        console.log(x)
        const text = x[0].text; //The reason for [0] is so js wouldnt consider it undefined -- I hate js so much 
        console.log(text);
        newTaskList[changeIndex].cTasks.push(text);

        
      }
    }
    setTasks(newTaskList);
  };
  
//------------------------------------------------------------------------------

//The complete button-------------------------------------------------------------
  const handleCTasks = () =>{
    setcTaskTog((prev) =>{
      return !prev;
    })
    // let state = menuopen;
    // setMenuOpen(!state);
    // let elements = document.getElementsByClassName("display");
    // for (let index = 0; index < elements.length; index++) {
    //   const item = elements[index];
    //   item.classList.toggle('none');
      
    // }
    // let elements = document.getElementsByClassName("icon");
    // for (let index = 0; index < elements.length; index++) {
    //   const item = elements[index];
    //   item.classList.toggle('none');
      
    // }

  }
// to close the complete list when a change happens
const handleCTasksOut = ()=>{

    if(menuopen){
      handleCTasks()
    }
  };

//------------------------------------------------------------------------------


//Handlint renaming the list--------------------------------------------------
  const handleOnInput = (e) => {
    setnewName(e.target.value);
  };

  const handleonBlur = (e) =>{
    setrenameList(false);
  };
  const handleonBlurv2 = (e) =>{
    setclicked(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName != "" && !data.includes(newName)) {
      const newData = data.map((c, i) => {
        if (i == index) {
          c = newName;
          return c;
        } else {
          return c;
        }
      });
      setData(newData);
      setnewName("");
      setrenameList(false);
      history.push(`/${newName.split(" ").join("-")}/${index}`);
    }else{
      if(data.includes(newName)){
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

        setnewName("");
        setrenameList(false);
  

      }
    }
  };

//------------------------------------------------------------


//Other functions for editing the data state-----------------------------------
  const handlePinToStart = (index) =>{
    let temp = data.filter( (item,ind) => index == ind);
    let newData = data.filter( (item,ind) => index != ind);
    newData.unshift(temp[0]);
    setData(newData)
    let newName = temp[0];
    history.push(`/${newName.split(" ").join("-")}/${0}`);

    setParamindex(0);
  };

  const handleDuplicate = (index) => {
    let temp = data.filter( (item,ind) => index == ind);
    let new_element = temp[0] + ' copy';
    while (data.includes(new_element)){
      new_element += ' copy'
    }
    setData((prev) => {
      return [...prev, new_element]
    })
  }

  const handleDelete = (index) => {
    let temp = data.filter( (item,ind) => index != ind);
    setData(temp);
    
    if(data[index - 1] != undefined){
      history.push(`/${data[index - 1].split(" ").join("-")}/${index - 1}`);
      setParamindex(index - 1);
    }else{
      history.push('');
      setParamindex(-1);
    }
    

  };
//---------------------------------------------------------------------------------
 const onMouseEnter = (item) =>{
  console.log(item)
  console.log('prev ' + item.hover);
  let prevState = item.hover;
  item.hover = !prevState;
  console.log('now ' + item.hover);
  setFunCalled(true);
 }
 
 const onMouseLeave = (item) =>{
  console.log('prev ' + item.hover);
  let prevState = item.hover;
  item.hover = !prevState;
  console.log('now ' + item.hover);
  setFunCalled(false);
 }
  

// Close the dropdown menu if the user clicks outside of it-------------------------
  window.onclick = function (event) {
    // console.log(event.target.id)
    if (event.target.id != 1 && event.target.id != 2) {
      setopenMemu(false);
    }
  };
//-----------------------------------------------------------------------------------

const handleTaskSubmit = (e)=> {
  e.preventDefault();
  if (taskInput != "") {
    let newTaskList = tasks.slice();//so react would see it as a change in state
    let changeIndex = currentTaskList()
    for (let index = 0; index < tasks.length; index++) {
      if(index != changeIndex){
      }else{
        const newObj = {
          text: taskInput,
          hover: false
        };
        newTaskList[changeIndex].uncTasks.push(newObj);
      }
    }
    setTasks(newTaskList);
    setTaskInput("");
    setclicked(false);
  }
}


// This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}, ${month} ${date.getDate()}`;
  return (

    <Content>
      {/* rendering the nav bar with the menu button */}
      <NavHeader>
        <div className="listProp">
          {!renameList && (
            <div className="listName">{`${name.split("-").join(" ")}`}</div>
          )}
          {renameList && (
            <form onSubmit={handleSubmit}>
              <input
                autoFocus
                className="newName-input"
                placeholder=""
                value={newName}
                maxlength="15"
                onChange={handleOnInput}
                onBlur={handleonBlur}
              />
            </form>
          )}

          <button
            className="icon-button"
            id="1"
            onClick={() => setopenMemu((prev) => !prev)}
          >
            <BsThreeDots className="icon" id="2" size={16}></BsThreeDots>
          </button>

        </div>

        {openMenu && (
          <div className="Drop-Menu">
            <DropdownMenu setrenameList={setrenameList} handlePinToStart = {handlePinToStart} handleDuplicate = {handleDuplicate} handleDelete = {handleDelete} ></DropdownMenu>
          </div>
        )}

        <div className="date">{currentDate}</div>

      </NavHeader>
      {/* Rendering the tasks */}
      <Tasks>
            {
              tasks[currentTaskList()].uncTasks.map((item,index) =>{
                  return (
                  <Task 
                      onClick = {() => {
                        // handleCTasksOut()
                        handleTaskClick(index)
                        // handleCTasksOut()
                    
                        }}
                      onMouseEnter = {() => {onMouseEnter(item)}}
                      onMouseLeave = {() => {onMouseLeave(item)}}
                    >
                      {
                        !item.hover &&
                        <GiSquare className="icon-in-task"></GiSquare>
                      }
                      {
                        item.hover &&
                        <BsCheck2Square className="icon-in-task1"></BsCheck2Square>
                      }
                    <div className="text-in-task"><p>{item.text}</p></div>
                  </Task>);
                
              })
            }
            <TogList onClick = {handleCTasks}>
              {!cTaskTog && <MdOutlineKeyboardArrowRight className="icon"></MdOutlineKeyboardArrowRight>}
              { cTaskTog && <MdOutlineKeyboardArrowDown className="display"></MdOutlineKeyboardArrowDown>}
                Completed
            </TogList>
            {cTaskTog &&
              tasks[currentTaskList()].cTasks.map((item,index) =>{
                return (
                  <Container>
                    <Task className="display tasks" 
                        onClick={() => {
                          makeUncomplete(index)
                          handleCTasksOut()
                    }}>
                      <BsCheck2Square className="icon-in-task"></BsCheck2Square>
                      <div className="text-in-task"><s>{item}</s></div>
                    </Task>
                  </Container>
                );
              
            })
            
            }
      </Tasks>
      <AddTaskContainer>
        {!isclicked &&
          <Addtask onClick={handleClick}>
            <BsPlusSquare className="icon"/>
            <div className="placeHolderText">Add a task</div>
          </Addtask>
        }
        {isclicked &&
          
          <InputName className="filter">
            <GiSquare className="icon-in-task"></GiSquare>
            <form onSubmit={handleTaskSubmit} className="formo">
              <input
                autoFocus
                className="taskInput"
                placeholder="Add a task"
                value={taskInput}
                onChange={handleOnTaskInput}
                onBlur={handleonBlurv2}
              />
            </form>
          </InputName>
        
        }
      </AddTaskContainer>

    </Content>
  );
};

export default ListContent;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* justify-content: flex-end; */
  
  /* justify-content: space-between; */
  /* background-color: Blue; */
  /* width: 220px; */
  color: #bdbdbd;
  /* padding: 0px 4px; */
`;

const NavHeader = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-color: #292929; */
  color: #bdbdbd;
  padding: 0px 4px;
  /* background-color: red; */
  .newName-input {
    margin-top: 12px;
    margin-bottom: 12px;
    height: 32px;
    width: 50%;
    background-color: #1c1c1c;
    border: transparent;
    border-bottom: 0.5px solid #9f9f9f;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    color: #9f9f9f;
    font-size: 30px;
  }
  .newName-input:focus-visible {
    outline: none;
    border-bottom: 0.5px solid #80b2ff;
  }
  .listProp {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

    /* align-items: center; */
    /* .icon-button{
            background-color: transparent;
            border: none;
            color: #9f9f9f;
            padding: 0px;
            margin: 0px;
            
        } */
    .icon-button {
      /* height: 100%; */
      color: inherit;
      background-color: transparent;
      border: none;
      align-self: center;
      margin-left: auto;
      margin-right: 32px;
      padding: 0px 8px;
      padding-top: 8px;
      padding-bottom: 4px;
      :hover {
        background-color: rgba(121, 121, 121, 0.3);
        border-radius: 2px;
      }
      .icon {
        pointer-events: "none";
      }
    }
  }
  .Drop-Menu {
    position: absolute;
    right: 0.2rem;
    top: 2.95rem;
  }
  .listName {
    font-size: 30px;
    font-weight: 500;
    line-height: 200%;
    width: 50%;
  }
  .date {
    font-size: 15px;
    font-weight: 500;
    line-height: 100%;
  }
`;

const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* background-color: red; */
  height: 550px;
  margin-top: 16px;
  margin-right: 28px;
  overflow-y: scroll;
  
  /* background-color: red; */
  ::-webkit-scrollbar {
    width: 8px;
    /* margin: 4px 0px; */
    /* padding: 4px 0px; */
    /* height: 8px; */
  }

  ::-webkit-scrollbar-track {
    border-radius: 8px;
    /* background-color: #292929; */
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 3px solid transparent;
    background-clip: content-box;
    background-color: #a0a0a0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .none{
    display: none;
  }
`;
const TogList = styled.div`
  display: inline-flex;
  flex-direction:row;
  cursor: pointer;
  /* justify-content: left; */
  align-items: center;
  /* margin: 8px 0px; */
  color: rgb(240,255,240,0.9);
  margin-top: 6px;
  width: 108px;
  min-height: 28px;
  max-height: 28px;
  padding: 4px 4px;
  background: rgba(78, 78, 78, 0.5);
  border-radius: 8px;
  font-weight: 350;
  font-size: 16px;
  line-height: 200%;
  :hover{
    background-color: rgba(121, 121, 121, 0.4);
  }
  .none{
    display: none;
  }

`;

const Task = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: blue; */
  width: 100%;
  min-height: 52px;
  /* max-height: 52px; */
  font-size: 18px;
  font-weight: 350;
  align-items: center;
  background: rgba(78, 78, 78, 0.5);
  border-radius: 5px;
  margin-top: 8px;
  overflow: auto;
  /* overflow-wrap: break-word; */
  
  /* white-space:normal; */
  /* word-break: break-all; */
  /* word-wrap: break-word;  */
  /* word-break: brea/k-word; */
  ::-webkit-scrollbar {
    width: 8px;
    /* margin: 4px 0px; */
    /* padding: 4px 0px; */
    /* height: 8px; */
  }

  ::-webkit-scrollbar-track {
    border-radius: 8px;
    /* background-color: #292929; */
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 3px solid transparent;
    background-clip: content-box;
    background-color: #a0a0a0;
  }
  
  color: rgb(240,255,240,0.9);

  :hover{
    background-color: rgba(121, 121, 121, 0.4);
    
  }
  .text-in-task{
    /* align-self: auto; */
    line-height: 100%;
    margin: 0px 4px;
    
    /* word-break: break-all; */

    /* overflow: hidden; */  

    
    /* line-height: 200%; */
  }
  .icon-in-task{
    /* line-height: 100%; */
    font-size: 22px;
    min-width: fit-content; // this made it so the icon size wouldnt change when there is a lot of text
    /* padding: 0 50px; */
    color: rgb(240,255,240,0.7);
    /* font-weight: 1000; */
    margin-left: 8px;
    margin-right: 1px; //so when changing the icon the text wouldnt go to the right
    /* box-sizing: inherit; */
    /* font-weight: 900; */
    /* font-size: 5dvw; */
  }
  .icon-in-task1{
    /* line-height: 100%; */
    font-size: 23px;
    color: rgb(240,255,240,0.7);
    /* font-weight: 1000; */
    margin-left: 8px;
    min-width: fit-content;

    /* font-weight: 900; */
    /* z-index: 1; */
  }
  .check{
    display: none;
  }
  
  
`;

const AddTaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-self: flex-end; */
    margin-top: auto;
    margin-bottom: 8px;
    margin-right: 28px;

  
    /* background-color: red; */

`;

const Addtask = styled.div`

  display: flex;
  flex-direction: row;
  /* background-color: blue; */
  width: 100%;
  min-height: 52px;
  max-height: 52px;
  font-size: 18px;
  font-weight: 350;
  align-items: center;
  background: #292929;
  border-radius: 5px;
  cursor: text;
  

  .placeHolderText{
    margin: 0px 8px;
  }
  .icon{
    font-size: 21px;
    color: rgb(240,255,240,0.7);
    /* font-weight: 1000; */
    margin-left: 8px;
  }
  :hover{
    background-color: rgba(121, 121, 121, 0.4);
    
  }

`;

const InputName = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: blue; */
  width: 100%;
  min-height: 52px;
  max-height: 52px;
  
  font-weight: 350;
  align-items: center;
  background: #292929;
  border-radius: 5px;
  
  cursor: text;
  .formo{
    overflow: hidden;
    width: 100%;
    border-radius: 5px;
  }
  .taskInput {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    min-height: 52px;
    max-height: 52px;
    line-height: 100%;
    background-color: #292929;
    width: 100%;
    font-size: 18px;
    border-radius: 5px;
    padding: 0;
    /* margin-left: 4px ; */

    border: transparent;
    color: #9f9f9f;
  }
  .taskInput:focus-visible {
    outline: none;
  }
  .icon-in-task{
    font-size: 22px;
    color: rgb(240,255,240,0.7);
    /* font-weight: 1000; */
    margin-left: 8px;
    margin-right: 4px; 
    
  }
`;