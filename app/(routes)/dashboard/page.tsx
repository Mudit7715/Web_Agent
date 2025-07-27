import React from "react"
import HistoryList from "./_components/HistoryList";
import { Button } from "@/components/ui/button";
import DoctorsAgentList from "./_components/DoctorsAgentList";
import AddNewSessionDialogue from "./_components/AddNewSessionDialouge";

function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className = 'font-bold text-2xl'>My Dashboard</h2>
        <AddNewSessionDialogue />
      </div>
      <HistoryList />

      <DoctorsAgentList />
    </div>
  )
};

export default Dashboard;
