import React from 'react'
import ProfileEdit from '../components/ProfileEdit'
import { useSelector } from 'react-redux'
import CardComponent from '../components/CardComponent'

const Profile = () => {
  const user = useSelector((store)=> store?.user)
  return (
    user && (<div className='flex justify-center items-center m-auto mr-9'>
      <ProfileEdit user={user}/>
    </div>)
  )
}

export default Profile