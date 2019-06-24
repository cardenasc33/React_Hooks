import React, { useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import { fetchUser } from '../actions/userActions';
//import { createUser } from '../actions/userActions';
import { exists } from 'fs';
import UserContext from '../context/users/userContext';

import Modal from './Modal';
import useModal from './useModal'; //ties custom React Modal Hook and Modal component together

const useForceUpdate = () => useState()[1];

const SearchUser = ({}) => {
    const userContext = useContext(UserContext); 
   
    
    const forceUpdate = useForceUpdate();
    
    //const [info, setInfo] = useState({});
   
    
    const isEmpty = myObject => {
        for(var key in myObject) {
            if (myObject.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };
  
    
    useEffect(() => {
        userContext.searchUsers();

        if(isEmpty(userContext.user)){
            console.log("User not found: ");
            console.log(userContext.not_found);
            if(isEmpty(userContext.not_found)){
                console.log("No search conducted");
            }else{ //new user added to database
                console.log("New user added to database");
                console.log(userContext.not_found);
                userContext.createUser(userContext.not_found);

                //rerender component when new user added to database
                forceUpdate();
                
            }
            
         
        }else{
            console.log("UIN match was found");
            console.log(userContext.user);
        }

    },[userContext.user]);
    
   
    //Called by Manual check in
    const searchUser = (uin) =>{

        userContext.getUser(uin); //getUser defined by userContext
        //TODO get response from user search
        //display modal with information
        //toggle(); //toggles the view of the modal
        userContext.setModal();
        
    }

    const enterPressed = (e) => {
        var keyValue = e.keyCode || e.which;
        if(keyValue === 13){
            checkId();
        }
    }

    const checkId = () => {
        var typedUIN = document.getElementById('uinInput').value;
        if (typedUIN.length === 9){     
            searchUser(typedUIN);
            
        }  
    }

    const getText = () => {
        var textInput = document.getElementById('text').value;
        textInput = textInput.replace(/\s/g, ''); 
        count(textInput);
        
    }

    const count = (textInput) =>{
        var total = textInput;
        total = total.replace(/\s/g, '');
        document.getElementById("total").innerHTML="Total Characters: " + (total.length);
        
        statusUpdate(total.length , total); 

    }
        
    const statusUpdate = (len , text) => { //Param is the number of characters in the input field

        var maxLength = 79; //Total amount of characters for a successful card swipe
        var prefix = text.toString().substring(0, 2); //obtains the prefix characters of the input (ex. %B)  


        //TODO check creat diagram
        document.getElementById("prefix").innerHTML= "Prefix: " + prefix;

            if (len === 0){ 
                document.getElementById("status").innerHTML="Status: " + "Please Swipe Card";
            }
            if (len === maxLength && prefix === "%B"){
                document.getElementById("status").innerHTML="Status: " + "Success"; //Card was read properly
                getUIN(text); //Calls the function getUIN() to obtain the UIN substring
            }
            else{
                document.getElementById("status").innerHTML="Status: " + "Error, please swipe again"; //Card did NOT read properly
            }
    }

    /* 
     * called if UIN is obtainable 
     * searches UIN in the database,
     * displays info for matching UIN
     */ 
    
     const getUIN = (text) => {
        var uin = text.substring(54, 63); //Obtains the string of the UIN
        document.getElementById("uinID").innerHTML="UIN: " + uin;
        userContext.getUser(uin);
    }

    //replace render

            //const data = userContext.user;
            const data= userContext.user;
           

           
            




            const swipeSearch = (
                <div class = "searchUser">
                    <h1>Swipe Check In: </h1>
                    <input id = "text" type="text" onInput={getText}></input>
                    <p id = "total"> Total Characters: 0</p>
                    <p id = "status"> Status: Please Swipe Card</p>
                    <p id = "uinID">UIN: </p>
                    <p id="prefix">Prefix: </p>
                </div>
            )

            const manualSearch = (
                <div class="searchUser">
                    <h1> Manual Check In: </h1>
                    <form id = "manualForm" onSubmit = {e => e.preventDefault()} onKeyPress={enterPressed.bind(this)}>
                        UIN:<br></br>
                        <input type="text" id="uinInput"  required minLength="9" maxLength="9" ></input>
                        <br></br>
                        <button id="checkinBtn"  type="button" onClick={checkId}>Manual Checkin</button>
                    </form>
                </div>
            );
            
            /*
                const userItem = (
                <div key={data.uin}>
                    <p>{data.firstName} {data.lastName}</p>
                    <p>UIN: {data.uin}</p>
                    <p>RSVP: {data.rsvp}</p>
                    <p>Checked In: {data.checkIn}</p>
                    <br></br>
                </div>
            );
            */

            const userItem = (
                <div key={data.uin}>
                    <p>{data.firstName} {data.lastName}</p>
                    <p>UIN: {data.uin}</p>
                    <p>RSVP: {data.rsvp}</p>
                    <p>Checked In: {data.checkIn}</p>
                    <br></br>
                </div>
            );
            
       

        return (
            <div>
                {swipeSearch}
                {manualSearch}
                {userItem}
                

            </div>
        )
    

}

SearchUser.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,   
    setModal: PropTypes.func.isRequired,
    showClear: PropTypes.object,
    setAlert: PropTypes.object,
}

const mapStateToProps = state => (
{
    user: state.student.found,
    user_not_found: state.student.not_found
}
)


export default SearchUser;