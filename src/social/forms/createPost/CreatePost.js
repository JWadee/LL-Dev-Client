import React, {useState} from 'react'
import isEmpty from '../../../utils/isEmpty';
import SelectBet from './SelectBet';
import WriteUp from './Writeup';

const CreatePost = (props) => {
    const [step, setStep] = useState(1);
    const [bet, setBet] = useState({});
    const [writeup, setWriteup] = useState('')

    //Method to go to next step
    function nextStep(){
        setStep(step+1);
    }
    //Method to go to previous step
    function prevStep(){
        setStep(step-1);
    }

   
    //function to create post
    const createPost = ()=>{
        let timestamp = Date.now();
        let contents = {
            writeup: writeup,
            timestamp: timestamp
        }

        const body = {
            betIDs : [bet.id],
            contents: JSON.stringify(contents),
            accountid: props.userid
        }

        //api parameters to create game
        const url ='https://api.lineleaders.net/posts/create'
        const options = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=UTF-8'
            }, 
            body: JSON.stringify(body)
        }

        //call api
        fetch(url, options)
            .then(response=> {
                props.close();
            })
            .catch(err=>{
                console.log(err)
            })
    }

    //function to submit post
    const submitPost = () =>{
        if(!isEmpty(bet)){
            createPost();
        }
    }

    switch(step){
        case 1:
            props.setHeader("Select Bet");
            return (
                <SelectBet nextStep={()=>nextStep()} setBet={setBet} bet={bet} openBets={props.openBets}/>
            )
        case 2: 
            props.setHeader("Writeup");
            return (
                <WriteUp prevStep={()=> prevStep()}  setWriteup={setWriteup} writeup={writeup} bet={bet} submitPost={submitPost}/>
            )    
    }
}

export default CreatePost;