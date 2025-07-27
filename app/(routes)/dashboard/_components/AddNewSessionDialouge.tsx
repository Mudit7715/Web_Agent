"use client"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorCard from "./suggestedDoctorCard";

function AddNewSessionDialogue() {
    const [note, setNote] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
    const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();

    const OnCLickNext = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/api/suggest-doctors', { // Fixed: added 'd'
                notes: note
            });

            console.log(result.data);
            setSuggestedDoctors(result.data.suggestedDoctors || result.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    const onStartConsultation = async () =>{
        setLoading(true);
        //save all info to database
        const result= await axios.post('/api/session-chat', {
            notes: note,
            selectedDoctor: selectedDoctor
        });

        console.log(result.data)
        if(result.data?.sessionId)
        {
            console.log(result.data.sessionId);
            //route to new conversation screen
        }

        setLoading(false);
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mt-3 bg-black text-white hover:bg-gray-800">
                        + Start a Consultation
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {!suggestedDoctors ? "Add Basic Details" : "Choose Your Doctor"}
                        </DialogTitle>
                    </DialogHeader>
                    
                    {/* Dynamic DialogDescription based on state */}
                    <DialogDescription>
                        {!suggestedDoctors 
                            ? "Add symptoms and other Details" 
                            : "Select the Doctor"
                        }
                    </DialogDescription>
                    
                    {/* Content based on state */}
                    {!suggestedDoctors ? (
                        <div>
                            <Textarea
                                placeholder="Describe your symptoms"
                                className="h-[200px] mt-2"
                                value={note || ''}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                            {suggestedDoctors.map((doctor, index) => (
                                <SuggestedDoctorCard key={doctor.id || index} doctorAgent={doctor} 
                                setSelectedDoctor={() => setSelectedDoctor(doctor)}
                                //@ts-ignore
                                selectedDoctor={selectedDoctor}/>
                            ))}
                        </div>
                    )}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={'outline'}>
                                Cancel
                            </Button>
                        </DialogClose>
                        
                        {!suggestedDoctors ? (
                            <Button 
                                disabled={!note || loading} 
                                onClick={OnCLickNext}
                                className="flex items-center gap-2"
                            >
                                Next 
                                {loading ? (
                                    <Loader2 className='animate-spin h-4 w-4' />
                                ) : (
                                    <ArrowRight className="h-4 w-4" />
                                )}
                            </Button>
                        ) : (
                            <Button disabled={loading} onClick={() => onStartConsultation()}>
                                Start Consultation
                                {loading ? (
                                    <Loader2 className='animate-spin h-4 w-4' />
                                ) : (
                                    <ArrowRight className="h-4 w-4" />
                                )}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewSessionDialogue;
