import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../App";

const Proposals = () => {
  const App = useContext(AppState);
  const [Data, setData] = useState([]);
  const [num, setnum] = useState(0);
  const Vote = async (id) => {
    try {
      console.log(id);
      const tx = await App.DaoContract.vote(id);
      await tx.wait();
      alert("Voted Sucessfull !");
      setnum(num + 1);
    } catch (error) {
      if (error.message === "All ready voted") {
        alert("All ready voted");
      } else {
        console.log(error.message);
        alert("Something went wrong");
      }
    }
  };
  useEffect(() => {
    const getProposals = async () => {
      try {
        const proposals = await App.DaoContract.getProposals();
        setData(proposals);
      } catch (error) {
        console.log(error);
      }
    };
    getProposals();
  }, [num, App.DaoContract]);
  return (
    <div>
      <div class="container px-5 py-5 mx-auto">
        <div class="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
          {Data && Data?.length !== 0 ? (
            Data.map((e, id) => {
              return (
                <div class="p-4">
                  <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                    <h2 class="tracking-widest text-xl title-font font-medium text-gray-400 mb-1">
                      Proposal Id-: {id}
                    </h2>
                    <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                      {e.name}
                    </h1>
                    <p class="leading-relaxed mb-3">{e.discription}</p>
                    <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                      <span class="text-black  font-bold mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        Votes
                      </span>
                      <span class="text-black font-bold  inline-flex items-center leading-none text-sm">
                        {e.voteCount.toString()}
                      </span>
                    </div>
                    <button
                      onClick={() => Vote(id)}
                      class="flex mx-auto mt-10 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded"
                    >
                      Vote Now
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div class="flex items-center justify-center h-1/2">
              <div class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                No Proposals found.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proposals;
