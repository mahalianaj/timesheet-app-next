'use client'

import { useState } from "react"

export default function TaskTypeSelector({selectedType, setSelectedType}){
    
    return (
         <fieldset className="form-fieldset">
        <legend className="form-text">Task Type <span className="text-red-600"> *</span></legend>
            <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                required
                className="form-select outline-none"
                >
                <option value="" disabled className="text-gray-400">--Development or Discovery--</option>
                <option value={"Development"}>Development</option>
                <option value={"Discovery"}>Discovery</option>
            </select>
        </fieldset>
    )
}