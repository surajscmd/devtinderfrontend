import { Route, Routes } from 'react-router-dom'
import Body from './Body'
import Login from './elements/Login'
import Profile from './elements/Profile'
import Feed from './elements/Feed'
import Connection from './elements/Connection'
import ConnectRequest from './elements/ConnectRequest'
import Chat from './elements/Chat'
import Membership from './elements/Membership'


function App() {
  return (
    <>

    <Routes>
      <Route path="/" element={<Body/>} >
         <Route path="/" element={<Feed/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/profile" element={<Profile/>} />
         <Route path="/connection" element={<Connection/>} />
         <Route path="/connectionrequest" element={<ConnectRequest/>} />
         <Route path="/chat/:targetUserId" element={<Chat/>} />
         <Route path="/membership" element={<Membership/>} />
      </Route>
    </Routes>

    </>
  )
}

export default App
