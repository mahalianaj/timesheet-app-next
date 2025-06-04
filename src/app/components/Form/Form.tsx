'use client'

import React, { use, useEffect, useState } from "react";

import DateInput from "./DateInput";
import LongTextInput from "./LongTextInput";
import ProjectSelector from "./ProjectSelector";
import HoursInput from "./HoursInput";
import TaskTypeSelector from "./TaskTypeSelector";
import '../../styles/form.css'

 export default function MyForm() {
    const [taskDescription, setTaskDescription] = useState('');
    const [hours, setHours] = useState('');
    const [date, setDate] = useState('');

    const [projects, setProjects] = useState([]);
    let [newProject, setNewProject] = useState('');

    let [selectedProject, setSelectedProject] = useState('');
    const [customProject, setCustomProject] = useState('');

    const [selectedType, setSelectedType] = useState<string>('');

    const [formSubmitted, setFormSubmitted] = useState(false);
    
    useEffect(() => {
        async function fetchProjects() {
            try{
                const res = await fetch('/api/projects')

                if (!res.ok) {
                    throw new Error('Failed to fetch projects');
                }

                const data = await res.json()
                console.log('Fetched projects:', data);
                setProjects(data.list);

            } catch (error) {
                console.error('Error fetching projects: ', error);
            }
        }
        fetchProjects();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (selectedProject === 'custom'  && newProject) { 
                const projectRes = await fetch('api/projects', {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({project: newProject})
                });
               selectedProject = newProject; 
            }
            const entry = {
                taskDescription,
                hours,
                date,
                project: selectedProject,
                taskType: selectedType
            };

            const res = await fetch('api/entries', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(entry)
            });


            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to submit form');
            } else {
                // Reset form fields
                setTaskDescription('');
                setHours('');
                setDate('');
                setSelectedProject('');
                setNewProject('');
                setFormSubmitted(true);
                setTimeout(() => setFormSubmitted(false), 2500);
                setSelectedType('');
            }

        } catch (error) {
            console.error('Error submitting form: ', error);
            alert('There was an error submitting the form. Please try again.')
        }
    };

    return (
        <div className="flex flex-row px-8 pb-8">
            <form onSubmit={handleSubmit}>
                <h2 className="text-center font-semibold pb-1 text-blue-950">Log in new hours</h2>
                {formSubmitted && (
                    <div className="text-green-700 bg-green-100 border border-green-400 p-2 rounded mb-4 text-center">
                        Form submitted successfully!
                    </div>
                )
                }
                <DateInput date={date} setDate={setDate} />
                <div className="mt-2"></div>
                <LongTextInput text={taskDescription} setText={setTaskDescription}/>
                <div className="mt-2"></div>
                <TaskTypeSelector selectedType={selectedType} setSelectedType={setSelectedType}/>
                <div className="mt-2"></div>
                <ProjectSelector selectedProject={selectedProject} 
                                setSelectedProject={setSelectedProject}
                                newProject={newProject}
                                setNewProject={setNewProject}
                                projects={projects} />
                <div className="mt-2"></div>
                <HoursInput hours={hours} setHours={setHours}/>
                
                <h1><span className="text-red-600 text-sm"> *required fields</span></h1>
                <button type='submit' className="form-button">Submit Form</button>
            </form>
        </div>
    );
}

