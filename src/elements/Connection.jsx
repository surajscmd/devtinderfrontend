import axios from "axios";
import React, { useEffect, useState } from "react";
import { Base_Url } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import ConnectionCard from "../components/ConnectionCard";

const Connection = () => {
  const [connection, setConnection] = useState("");
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnection = async () => {
    try {
      const res = await axios.get(Base_Url + "/user/connections", {
        withCredentials: true,
      });
      setConnection(res?.data?.data);
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return null;

  if (!connections.length) {
    return (
      <div className="flex justify-center my-10">
        <p>No Connection Found</p>
      </div>
    );
  }

  return (
    <div className="text-center my-10 mb-28">
      {connections.map((data) => (
        <div key={data._id} className="m-4">
           <ConnectionCard user={data} />
        </div>
      ))}
    </div>
  );
};
export default Connection;
