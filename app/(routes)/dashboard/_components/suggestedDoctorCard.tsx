import React from "react"
import Image from "next/image";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";

type props = {
    doctorAgent: doctorAgent,
    setSelectedDoctor: any
    selectedDoctor: doctorAgent
}

function SuggestedDoctorCard({doctorAgent, setSelectedDoctor, selectedDoctor}: props) {
  return (
    <div className={`flex flex-col items-center 
    border-3 rounded-2xl shadow p-5
    hover:border-blue-400 cursor-pointer transition-all
    ${selectedDoctor?.id === doctorAgent.id && 'border-blue-500'}`}
    onClick={()=>setSelectedDoctor(doctorAgent)}>
        <Image 
          src={`/${doctorAgent.image}`} // Fixed: Added leading slash
          alt={doctorAgent.specialist} 
          width={200} // Match the className width
          height={200} // Match the className height
          className="w-[200px] h-[200px] object-cover object-top rounded-lg"
          onError={(e) => {
            // Fallback in case image fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
        <h2 className="text-sm font-bold text-center mt-2">{doctorAgent.specialist}</h2>
        <p className="text-xs text-gray-500 text-center line-clamp-4 mt-2">{doctorAgent.description}</p>
    </div>
  )
}

export default SuggestedDoctorCard;
