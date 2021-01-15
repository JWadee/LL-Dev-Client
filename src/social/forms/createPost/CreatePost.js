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

    // submitPost = () =>{
    //     if(!isEmpty(bet)){

    //     }
    // }

    switch(step){
        case 1:
            return (
                <SelectBet nextStep={()=>nextStep()} setBet={setBet} bet={bet} openBets={props.openBets}/>
            )
        case 2: 
            return (
                <WriteUp prevStep={()=> prevStep()}  setWriteup={setWriteup} writeup={writeup} bet={bet}/>
            )    
    }
}

export default CreatePost;