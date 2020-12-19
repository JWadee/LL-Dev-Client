import React from 'react'
import {Table} from 'react-bootstrap'
import formatTime from '../../../utils/formatTime';

const FixturesTable  = (props) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th colSpan="2">Fixtures Needing Results</th>
                </tr>
            </thead>
            <tbody>
                {props.fixts.length > 0 ?
                    props.fixts.map(fixt=>{
                        return(
                            <tr key={fixt.fixture_id} onClick={()=>props.setSelected(fixt)}> 
                                <td>
                                    {formatTime(fixt.fixture.commence_time)}
                                </td>
                                <td>
                                    {fixt.fixture.home_team +" vs. "+fixt.fixture.away_team}
                                </td>
                            </tr>
                        )
                    })
                        :
                    <></>
                }
             
            </tbody>
        </Table>
    )

}

export default FixturesTable