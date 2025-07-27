import { AIDoctorAgents } from "@/shared/list";
import React from "react"
import DoctorsAgentCard from "./DoctorAgentCard";

function DoctorsAgentList() {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl mt-2">AI Special Agents</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-4 mt-3">
        {AIDoctorAgents.map((doctor, index) => (
            <div key={index}>
              <DoctorsAgentCard doctorAgent={doctor} />
            </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsAgentList;
