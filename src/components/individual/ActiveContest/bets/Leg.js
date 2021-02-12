import React from 'react'
import formatTime from '../../../../utils/formatTime';
import stringifyOddsAndPoints from '../../../../utils/stringifyOddsAndPoints';
const Leg = (props) => {
    let leg = props.leg
    let time = formatTime(leg.fixture.time)

    if(leg.line.type === "Moneyline"){
        return (
            <td>
                    <b>{leg.line.team.type === "Draw" ? 
                        leg.line.team.type
                            :
                        leg.line.team.name
                    }</b>
                    <br/>{leg.fixture.fixture}
                    <br/>{time}
            </td>
        )
    }else if(leg.line.type === "Spread"){

        return (
            <td>
                <b>{leg.line.team.name + " " + stringifyOddsAndPoints(leg.line.line)}</b>
                <br/>{leg.fixture.fixture}
                <br/>{time}
            </td>
        )
    }else if(leg.line.type === "Total"){
        return (
            <td>
                <b>{leg.line.bet + " " + leg.line.line}</b>
                <br/>{leg.fixture.fixture}
                <br/>{time}
            </td>
        )
    }
    return(
        <></>
    )
}

export default Leg