import React, { useContext, useState, useEffect } from "react";
import { AppState } from "../App";

const Approve = () => {
  const App = useContext(AppState);
  const [data, setdata] = useState([]);
  const approve = async (proposal) => {
    try {
      const tx = await App.DaoContract.ApproveMembership(proposal);
      await tx.wait();
      alert("Approved Sucessfull!");
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong");
    }
  };
  const Clear = async () => {
    try {
      const tx = await App.DaoContract.clear();
      await tx.wait();
      alert("Cleared Sucessfull!");
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    const get = async () => {
      try {
        const proposals = await App.DaoContract.getPendingApproval();
        setdata(proposals);
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, [App.DaoContract]);
  return (
    <div>
      <div class="container mx-auto py-5">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((proposal, index) => (
            <div
              class="bg-gray-100 bg-opacity-75 p-5 rounded-lg overflow-hidden text-center relative"
              key={index}
            >
              <h1 class="title-font sm:text-xl text-xs font-medium text-gray-900 mb-3">
                {proposal}
              </h1>
              <button
                onClick={() => approve(proposal)}
                class="bg-indigo-500 text-white font-bold py-2 px-4 rounded mt-0 hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={() => Clear()}
          class="bg-indigo-500 text-white font-bold py-2 px-4 rounded mt-0 hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Approve;
//e
