
import React from 'react'

import UserComunity from './UserComunity';


const PersonalPost =async () => {
   
  

  return (
    <div className="mt-10 flex ">
      <h1 className="text-3xl font-semibold ">Your Community :-</h1>

      
      <div>
        <UserComunity/>
      </div>
    </div>
  );
}

export default PersonalPost