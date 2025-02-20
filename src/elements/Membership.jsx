import axios from 'axios'
import React from 'react'
import { Base_Url } from '../utils/constant'

const Membership = () => {
 
    const handleBuyClick = async (type) => {
       const order = await axios.post(Base_Url + "/payment/create",
      {
        membershipType : type
      },{withCredentials: true})
       
       const {amount , currency , keyId , notes, orderId } = order.data
       
       const options = {
        key: keyId,
        amount: amount, 
        currency: currency,
        name: 'Dev-Connect',
        description: 'Connect to other developers',
        order_id: orderId, 
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: '9148184670'
        },
        theme: {
          color: type == "gold" ? "#FFD700" : "#edede9"
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
       
      }
    return (
    <div className="text-center my-28 ">  
       <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Inifiniye connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
     </div>
 
  )
}

export default Membership