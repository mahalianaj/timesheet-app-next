'use client'
import { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';
import '../../styles/login.css'
import '../../styles/table.css'


export default function TimesheetTable(){
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        async function fetchEntries() {
            try{
                const res = await fetch('/api/entries')

                if(!res.ok) {
                    throw new Error('Failed to fetch entries');
                }

                const data = await res.json()
                console.log('Fetched entries: ', data);

                setEntries(data.list);
                setFilteredEntries(data.list);

            } catch (error) {
                console.error('Error fetching entries: ', error);
            }
        }
        fetchEntries();
    }, []);

    useEffect(() => {
        let filtered = [...entries];

        if (startDate)  {
            filtered = filtered.filter((entry) => entry.date >= startDate);
        }
        if (endDate) {
            filtered = filtered.filter((entry) => entry.date <= endDate);
        }
        setFilteredEntries(filtered);
        
    }, [startDate, endDate, entries])

    const totalHours = filteredEntries.reduce((sum, row) => sum + Number(row.hours), 0);

    return(
        <div>
            <div className="container">
                <h3 className="login-text">Select time period</h3>
                <fieldset className="login-fieldset">
                    <legend className="login-text">Start Date</legend>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </fieldset>
                <fieldset className="login-fieldset">
                    <legend className="login-text">End Date</legend>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </fieldset>
            </div>
            <div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Task Description</th>
                        <th>Task Type</th>
                        <th>Project</th>
                        <th>Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEntries.map((row, index) => (
                        <tr key={index}>
                            <td>{row.date}</td>
                            <td>{row.taskDescription}</td>
                            <td>{row.taskType}</td>
                            <td>{row.project}</td>
                            <td>{row.hours}</td>

                        </tr>
                    ))} 
                </tbody>
                    <tfoot>
                        <tr>
                            <td className="table-buffer" colSpan={3}></td>
                            <td className="font-bold" >Total hours</td>
                            <td className="font-bold">{totalHours}</td>
                        </tr>
                    </tfoot>
            </table>
            </div>
        </div>
    )
}