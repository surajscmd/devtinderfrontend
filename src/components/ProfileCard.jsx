import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl p-9">
        <figure>
          <img
            className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-primary"
            src={user?.photoUrl}
            alt="Shoes"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="font-bold text-2xl text-primary">
            {user?.firstName + " " + user?.lastName}
          </h2>
          { <p>{user.age + " , " + user.gender}</p>}
          {user?.about && <p>{user.about}</p>}
          {user?.skills && <p>{user.skills}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
