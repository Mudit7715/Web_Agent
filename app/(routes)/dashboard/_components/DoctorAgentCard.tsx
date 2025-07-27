import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export type doctorAgent={
    id:number,
    specialist:string,
    description:string,
    image:string,
    agentPrompt:string
}

type props = {doctorAgent: doctorAgent}

function DoctorAgentCard({doctorAgent}: props) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
        <Image src={`/${doctorAgent.image}`} 
            alt={doctorAgent.specialist} 
            width={300}
            height={400}
            className="w-full h-[300px] object-cover object-top rounded-lg" />
        
        <div className="mt-3">
          <h3 className="font-semibold text-lg">{doctorAgent.specialist}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{doctorAgent.description}</p>
          <Button className="w-full mt-3" variant="outline">
            Consult Now
          </Button>
        </div>
    </div>
  )
};

export default DoctorAgentCard;
