import React, {useEffect, useState} from 'react';
import StatChild from './statChild'
function Statistic(props) {
    const [authorized, setAuthorized]  = useState(false)

    return (
        <div className='card '>
            <div className='card-body'>
        <StatChild authorized={authorized} setAuthorized={setAuthorized}/>

            </div>
        </div>
    );
}

export default Statistic;