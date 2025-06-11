'use client'

import { useState, useEffect } from "react"
import TimesheetTable from "../components/TimeSheetTable/TimesheetTableInter";
import { useEntries } from "../hooks/useEntries";
import { useUsers } from "../hooks/useUsers";

import TimesheetList from "../components/TimeSheetTable/TimeSheetList";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function SendSheet(){
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [filtered, setFiltered] = useState<Entry[]>();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const {data: users = []} = useUsers();
    const user = users[0];

    const handleFilteredEntries = (entries: Entry[]) => {
        setFiltered(entries);
    };

    
    
    const generatePDF = (entries: Entry[], startDate: string, endDate: string, user: User) => {
        const doc = new jsPDF();
        function centerText(doc: jsPDF, text: string, y: number) {
            const pageWidth = doc.internal.pageSize.getWidth();
            const textWidth = doc.getTextWidth(text);
            const x = (pageWidth - textWidth) / 2;
            doc.text(text, x, y);
        }


        doc.setFontSize(16);
        centerText(doc, "Timesheet/ Activity Report", 22)


        doc.setFontSize(14);
        let y = 38;
        const lineSpacing = 6;
        doc.text(` ${user.consultant}`, 14, y);
        y += lineSpacing;
        doc.setFontSize(13);

        doc.text(` -> work period ${startDate} - ${endDate}`, 20, y)

        const userData = [
        ["Customer", user.customer],
        ["Contract no.", user.contract_number],
        ["Period", `${user.start_period} - ${user.end_period}`],
        ["Company", user.company],
        ["Consultant", user.consultant],
        ["Role", user.role],
        ];

        autoTable(doc, {
        startY: 30,
        columnStyles: {
            0: { cellWidth: 30 },
        },
        body: userData,
        });

         doc.setFontSize(12);
        centerText(doc, `Date Range: ${startDate} to ${endDate}`, 85)

        const tableData = entries.map((entry) => [
        entry.date,
        entry.taskDescription,
        entry.taskType,
        entry.project,
        entry.hours,
        ]);

        autoTable(doc, {
        startY: 90,
        head: [["Date", "Task Description", "Task Type", "Project", "Hours"]],
        body: tableData,
        });

        // Signature section
        const finalY = (doc as any).lastAutoTable.finalY || 80;
        doc.text("Signature: ___________________________", 14, finalY + 20);
        doc.text("Date: ___________________________", 14, finalY + 30);

        // Save the PDF
        const pdfBlob = doc.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            setPdfUrl(url);
        };

            if (!startDate || !endDate) {
  }


    return (
        <>
        <h1 className="text-lg font-bold">Export Timesheet </h1>
         <div className="flex flex-row w-full items-center gap-20">
            <div className="flex flex-col items-center pl-25">
            {!startDate || !endDate ? 
            <p className="text-gray-500 italic mt-4">Please select both start and end dates to filter entries.</p>
            : ''}
                <label>
                Enter start date <br/>
                <input 
                    type="date" 
                    value={startDate}
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Enter end date <br/>
                <input 
                    type="date" 
                    value={endDate}
                    required
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </label>
            {filtered && filtered.length > 0 && (
            <button 
                onClick={() => generatePDF(filtered, startDate, endDate, user)} 
                className="mt-4 px-4 py-2 bg-cyan-800 text-white rounded-md hover:bg-cyan-700"
            >
                Generate PDF preview
            </button>
            )}

        {/* <TimesheetList startDate={startDate} endDate={endDate} onFilter={handleFilteredEntries}/> */}
            </div>
            <div className="flex w-4xl">
            {pdfUrl && (
                <iframe
                src={pdfUrl}
                style={{ width: "100%", height: "600px", marginTop: "20px", border: "1px solid #ccc" }}
                title="PDF Preview"
                />
            )}
            </div>

         </div>
    </>
    )
}


