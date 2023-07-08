import React,{useContext,useState} from 'react'
import { AppState } from '../App'
const CreateProposal = () => {
  const App = useContext(AppState);
  const [name, setname] = useState('');
  const [discrition, setdiscrition] = useState('');
  const createProposal = async() => {
    try {
      const tx = await App.DaoContract.createProposal(name, discrition);
      await tx.wait();
      alert("Proposal Created Sucessfull !")
      setdiscrition('');
      setname('');
    } catch (error) {
      if (error.message === "You are not a member apply for membership") {
        alert("You are not a member apply for membership")
      }else{
        alert("Something went wrong")
      }
    }
  };
  return (
    <div>
      <section class="text-gray-600 body-font relative -mt-">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Create Proposal</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Create your proposal for voting by providing your name and brif discrition.</p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                  <input value={name} onChange={(e) => setname(e.target.value)} type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">Discrition</label>
                  <textarea value={discrition} onChange={(e) => setdiscrition(e.target.value)} id="message" name="message" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div class="p-2 mt-2 w-full">
                <button onClick={createProposal} class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </section>

        
    </div>
  )
}

export default CreateProposal