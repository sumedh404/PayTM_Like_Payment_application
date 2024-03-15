/* eslint-disable react/prop-types */

import {Link} from 'react-router-dom';

export function BottomWarning({label, buttonText, to}){
    return <div>
        <div>
          {label}
        </div>
        <Link className="pointer underline pl-1 curson-pointer flex" to={to}/>{buttonText}
          
    </div>
}