import React, { useRef, useState } from 'react'
import Card from '../components/Card'
import image1 from "../assets/VA1.jpg"
import image2 from "../assets/VA2.png"
import image3 from "../assets/VA3.png"
import image4 from "../assets/VA4.png"
import image5 from "../assets/VA5.png"
import image6 from "../assets/VA6.png"
import image7 from "../assets/VA7.png"
import {RiImageAddLine} from "react-icons/ri"

function Customize() {
  const [frontendImage,setFrontendImage] = useState(null)
  const [backendImage,setBackendImage] = useState(null)
  const inputImage = useRef()
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px]'>
      <h1 className='text-white mb-[40px] text-[30px] text-center'>Select your <span className='text-blue-200'>Assistant Image</span></h1>
      <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
        <Card image={image1}/>
        <Card image={image2}/>
        <Card image={image3}/>
        <Card image={image4}/>
        <Card image={image5}/>
        <Card image={image6}/>
        <Card image={image7}/>
        <div className='w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover-border-4 hover:border-white flex items-center justify-center' onClick={()=>inputImage.current.click()}>
          <RiImageAddLine className='text-white w-[25px] h-[25px]'/>
        </div>
        <input type='file' accept='image/*' ref={inputImage} hidden/>
      </div>
      <button className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px]">Next</button>
    </div>
  )
}

export default Customize
