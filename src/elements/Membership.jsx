import axios from "axios";
import React, { useEffect, useState } from "react";
import { Base_Url } from "../utils/constant";
import { useSelector } from "react-redux";

const Membership = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, [isUserPremium]);
  const user = useSelector((store) => store.user);

  const verifyPremiumUser = async () => {
    const res = await axios.get(Base_Url + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      Base_Url + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, currency, keyId, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount: amount,
      currency: currency,
      name: "Dev-Connect",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9148184670",
      },
      theme: {
        color: type == "gold" ? "#FFD700" : "#edede9",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return isUserPremium === true ? (
    <div className="text-center my-28">
      {(user?.membershipType === "free" || !user?.membershipType) && (
        <h1 className="text-3xl font-bold">You are already a premium user</h1>
      )}

      {user?.membershipType === "gold" ? (
        <div className="flex flex-col items-center justify-center gap-20">
          <h1 className="text-3xl font-bold">You are a Gold member</h1>
          <img
            className="w-52 h-52 rounded-full object-fill shadow-lg border-4 border-primary m-auto "
            src="https://img.lovepik.com/free-png/20210928/lovepik-game-shopping-consumption-gold-coins-png-image_401751616_wh1200.png"
            alt="Shoes"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-20">
          <h1 className="text-3xl font-bold">You are a Silver member</h1>
          <img
            className="w-52 h-52 rounded-full object-fill shadow-lg border-4 border-primary"
            src="https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-silver-coins-stacks-vector-silver-finance-icons-sign-success-banking-cash-png-image_1889622.jpg"
            alt="Shoes"
          />
        </div>
      )}
    </div>
  ) : (
    <div className="text-center my-28 ">
      <div className="m-10">
        <div className="flex w-full">
          <div className="card bg-base-300 rounded-box grid h-[500px] flex-grow place-items-center">
            <h1 className="font-bold text-3xl">Silver Membership</h1>
            <ul>
              <li> Chat with other people</li>
              <li> 100 connection Requests per day</li>
              <li> Blue Tick</li>
              <li> 3 months</li>
            </ul>
            <img
              className="w-28 h-28 rounded-full object-fill shadow-lg border-4 border-primary"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMIc7s2uQYkJlFJjXKNGkowN1efmnTJFAPdQ&s"
              alt="Shoes"
            />
            <button
              onClick={() => handleBuyClick("silver")}
              className="btn btn-neutral"
            >
              Buy Silver
            </button>
          </div>
          <div className="divider divider-horizontal">OR</div>
          <div className="card bg-base-300 rounded-box grid h-[500px] flex-grow place-items-center">
            <h1 className="font-bold text-3xl">Gold Membership</h1>
            <ul>
              <li> Chat with other people</li>
              <li> Inifiniye connection Requests per day</li>
              <li> Blue Tick</li>
              <li> 6 months</li>
            </ul>
            <img
              className="w-28 h-28 rounded-full object-fill shadow-lg border-4 border-primary"
              src="https://png.pngtree.com/png-clipart/20190115/ourmid/pngtree-gold-coin-png-image_317054.jpg"
              alt="Shoes"
            />
            <button
              onClick={() => handleBuyClick("gold")}
              className="btn btn-warning"
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
