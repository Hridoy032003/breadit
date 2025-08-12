
import UserProfile from '@/components/UserProfile';
import { getAuthSession } from '@/lib/auth';
import React from 'react'

const page = async() => {
  const session = await getAuthSession();
  return (
    <div>
        <UserProfile session={session}/>
<div>

</div>
<div>
    {/* <PersonalPost session={session}/> */}
</div>

    </div>
  )
}

export default page