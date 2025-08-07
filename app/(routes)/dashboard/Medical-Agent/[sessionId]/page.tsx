"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react"
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, PhoneCall } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";


type SessionDetail = {
  id: number,
  notes: string,
  sessionId: string,
  report: JSON,
  selectedDoctor: doctorAgent,
  createdOn: string
}

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();

  useEffect(() => {
    if (sessionId) {
      GetSessionDetails();
    }
  }, [sessionId]);

  const GetSessionDetails = async () => {
    try {
      const result = await axios.get('/api/session-chat?sessionId=' + sessionId);
      console.log('Raw API result:', result.data);
      
      let sessionData = result.data;
      
      // Handle different response structures
      if (sessionData.success) {
        sessionData = sessionData.data;
      }
      
      // Parse selectedDoctor if it's stored as JSON string
      if (sessionData.selectedDoctor && typeof sessionData.selectedDoctor === 'string') {
        try {
          sessionData.selectedDoctor = JSON.parse(sessionData.selectedDoctor);
        } catch (parseError) {
          console.log('selectedDoctor is not valid JSON:', sessionData.selectedDoctor);
          // Set fallback data
          sessionData.selectedDoctor = {
            id: sessionData.selectedDoctor,
            image: 'doctor1.png',
            specialist: 'Medical Specialist',
            description: 'Professional medical consultation'
          };
        }
      }
      
      console.log('Processed sessionData:', sessionData);
      setSessionDetail(sessionData);
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  }

  // Helper function to get valid image source
  const getImageSrc = () => {
    const image = sessionDetail?.selectedDoctor?.image;
    
    // Return null if image is empty, undefined, or invalid
    if (!image || image.trim() === '') {
      return '/doctor1.png'; // Fallback image
    }
    
    // Add leading slash if not present
    return image.startsWith('/') ? image : `/${image}`;
  };

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center mb-8">
        <h2 className='p-2 px-3 border rounded-md flex gap-2 items-center'>
          <Circle className="h-4 w-4 text-red-500"/> Not Connected
        </h2>
        <h2 className="font-bold text-xl text-gray-600">00:00</h2>
      </div>

      {sessionDetail && (
        <div className="flex flex-col items-center mt-10">

          <Image 
            src={getImageSrc()}
            alt={sessionDetail.selectedDoctor?.specialist || 'Doctor'}
            width={120}
            height={120}
            className="h-[120px] w-[120px] rounded-full object-cover border-2 border-gray-200"
            onLoad={() => {
              console.log('Image loaded successfully:', getImageSrc());
            }}
            onError={(e) => {
              console.log('Image failed to load, using fallback');
              e.currentTarget.src = '/doctor1.png';
            }}
          />
          
          <h3 className="text-lg font-semibold mt-3">
            {sessionDetail.selectedDoctor?.specialist || 'Medical Specialist'}
          </h3>

          <div className="mt-30">
          <h2 className="text-gray-400">Assistant Message</h2>
          <h2 className="text-lg">User Message</h2>
          </div>

          <Button className="mt-20"><PhoneCall /> Start Call</Button>

        </div>
      )}
    </div>
  )
}

export default MedicalVoiceAgent;

