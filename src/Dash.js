import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dash.css';
import logo from "./components/assets/ftlogo.png";
import headerImage from "./components/assets/moon2.png";
import Freezers from './components/freezer/freezers';
import Fridges from './components/fridge/fridges';
import Members from './components/members/members';

import dashIcon from "./components/assets/dashIcon.png";
import mealIcon from "./components/assets/mealIcon.png";
import setIcon from "./components/assets/setIcon.png";
import listIcon from "./components/assets/listIcon.png";
import powerIcon from "./components/assets/powerIcon.png";
import { getAuthToken } from './components/authService';

function Dash(){

const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const UUID = getAuthToken();

                const response = await axios.get(`https://agile-atoll-76917-ba182676f53b.herokuapp.com/api/user/${UUID}`);
 
                setUserData(response.data);

            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const [showMembers, setMembers] = useState(false);
    const [showFridges, setFridges] = useState(false);
    const [showFreezers, setFreezers] = useState(false);



    function colorChange(element){
        const divs = document.querySelectorAll(".elementButton");
    divs.forEach(function(div) {
        div.style.boxShadow = "5px 5px 5px rgb(121, 121, 121)";
    })
    element.style.boxShadow = "5px 5px 5px greenyellow";
    }

    // This needs to be simplified
  const membersHandler = (currentTarget) => {
    colorChange(currentTarget);
    setMembers(true);
    setFridges(false);
    setFreezers(false);
  }
  const fridgesHandler = (currentTarget) => {
    colorChange(currentTarget);
    currentTarget.style.boxShadow = "5px 5px 5px greenyellow";
    setMembers(false);
    setFridges(true);
    setFreezers(false);
  }
  const freezersHandler = (currentTarget) => {
    colorChange(currentTarget);
    currentTarget.style.boxShadow = "5px 5px 5px greenyellow";
    setMembers(false);
    setFridges(false);
    setFreezers(true);
  }
 

    return (


        <div className = 'wrapper'>
            
            <div className= 'sideBarWrapper'>

                <div className='fridgeLogoWrapper'>
                <img src = {logo} alt = "fridge logo"/>
                </div>
                
                <div className = 'dashboardButton'><img src={dashIcon} alt="d"/><p>Dashboard</p></div>
                <div className = 'dashboardButtonC' onClick = {(e)=> {membersHandler(e.currentTarget)}}><img src={dashIcon} alt="d"/><p>Members</p></div>
                <div className = 'dashboardButtonC' onClick = {(e)=> {fridgesHandler(e.currentTarget)}}><img src={dashIcon} alt="d"/><p>Fridges</p></div>
                <div className = 'dashboardButtonC' onClick={(e)=>{freezersHandler(e.currentTarget)}}><img src={dashIcon} alt="d"/><p>Freezers</p></div>

                <div className = 'mealButton'><img src={mealIcon} alt="m"/><p>Meals</p></div>
                <div className = 'mealButton'><img src={listIcon} alt="m"/><p>Shopping List</p></div>
                <div className = 'settingsButton'><img src={setIcon} alt="s"/><p>Settings</p></div>
                <div className = 'logoutButton'><img src={powerIcon} alt="s"/><p>Logout</p></div>
           
            </div>
            <div className='contentWrapper'>
                
                <div className= 'searchBarWrapper'>
                    <input type= 'text'/>
                </div>
                <div className = 'headerWrapper'>
                    <img src = {headerImage} alt = "header"></img>
                </div>

                <div className='mainSelectionArea'>
                    {showMembers && <Members />}
                    {showFridges && <Fridges />}
                    {showFreezers && <Freezers />}
                </div>

            </div>
            
        </div>

    );
}


export default Dash;
