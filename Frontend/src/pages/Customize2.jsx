import React, { useContext } from 'react'
import { userDataContext } from '../context/userContext'
import { useState } from 'react'
import {MdKeyboardBackspace} from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Customize2() {
    const {userData,backendImage,selectedImage,serverUrl,setUserData} = useContext(userDataContext)
    const [assistantName,setAssistantNameame] = useState(userData?.AssistantName || "")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const handleUpdateAssistant = async() =>{
      setLoading(true)
      try {
        let formData = new FormData()
        formData.append("assistantName",assistantName)
        if(backendImage){
          formData.append("assistantName",assistantName)
        }else{
          formData.append("imageUrl",selectedImage)
        }
        const result = await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
        setLoading(false)
        console.log(result.data)
        setUserData(result.data)
        navigate("/")
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    return(
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px]'>
      <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' onClick={()=>navigate("/customize")}/>
      <h1 className='text-white mb-[40px] text-[30px] text-center'>Enter your <span className='text-blue-200'>Assistant Name</span></h1>
      <input type="text" placeholder="E.g. Thomas" className="w-full max-w-[600px] h-[60px] border-2 border-white bg-transparent  text-white placeholder-gray-300 outline-none px-[20px] py-[10px] rounded-full text-[18px]" required onChange={(e)=>setAssistantNameame(e.target.value)} value={assistantName} />
      {assistantName && <button className="min-w-[300px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px] cursor-pointer" disabled={loading} onClick={
        ()=>{
          handleUpdateAssistant()
        }
      }
        >{!loading?"Finally Create Your Assistant":"Loading..."}</button>}
    </div>
  )
}

export default Customize2
