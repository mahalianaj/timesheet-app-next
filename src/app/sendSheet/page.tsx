'use client'

import { useState, useEffect } from "react"
import TimesheetTable from "../components/TimeSheetTable/TimesheetTableInter";
import { useEntries } from "../hooks/useEntries";
import { useUsers } from "../hooks/useUsers";
import Navigation from "../components/Global/NavBar";
import TimesheetList from "../components/TimeSheetTable/TimeSheetList";
import { MdOutlineFileDownload } from "react-icons/md";


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function SendSheet(){
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [filtered, setFiltered] = useState<Entry[]>();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [pdfFileName, setPdfFileName] = useState<string>("");
    const {data: users = []} = useUsers();
    const user = users[0];

    const handleFilteredEntries = (entries: Entry[]) => {
        setFiltered(entries);
    };
 
   const generatePDF = (entries: Entry[], startDate: string, endDate: string, user: User) => {
  const doc = new jsPDF();

  function centerText(text: string, y: number, fontSize = 14, isBold = false) {
    doc.setFontSize(fontSize);
    if (isBold) doc.setFont(undefined, "bold");
    else doc.setFont(undefined, "normal");
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(text);
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, y);
  }

  // Main Title
  centerText("Timesheet / Activity Report", 20, 18, true);
  doc.setDrawColor(0);
  doc.line(20, 24, doc.internal.pageSize.getWidth() - 20, 24); // horizontal line

  // User Info Section
  const userData = [
    ["Customer", user.customer],
    ["Contract No.", user.contract_number],
    ["Period", `${user.start_period} - ${user.end_period}`],
    ["Company", user.company],
    ["Consultant", user.consultant],
    ["Role", user.role],
  ];

  autoTable(doc, {
    startY: 30,
    theme: "grid",
    headStyles: {
      fillColor: [230, 230, 230],
      textColor: 0,
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 10,
      halign: 'left',
    },
    columnStyles: {
      0: { cellWidth: 45, fontStyle: 'bold' },
      1: { cellWidth: 'auto' },
    },
    body: userData,
    showHead: 'never',
  });

  const afterUserTableY = (doc as any).lastAutoTable.finalY + 10;


  centerText('Summary of the work fot the reporting period.', afterUserTableY, 12, false);

  // Entries Table
  const tableData = entries.map((entry) => [
    entry.date,
    entry.taskDescription,
    entry.taskType,
    entry.project,
    entry.hours,
  ]);

  autoTable(doc, {
    startY: afterUserTableY + 6,
    head: [["Date", "Task Description", "Task Type", "Project", "Hours"]],
    body: tableData,
    theme: "striped",
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [0, 96, 128],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { cellWidth: 25 }, // Date
      1: { cellWidth: 65 }, // Task Description
      2: { cellWidth: 30 }, // Task Type
      3: { cellWidth: 40 }, // Project
      4: { halign: 'right', cellWidth: 17 }, // Hours
    },
  });

  // Signature section
  const finalY = (doc as any).lastAutoTable.finalY || 80;
  doc.setFontSize(11);
  doc.text("Signature: ___________________________", 14, finalY + 20);
  doc.text("Date: ___________________________", 14, finalY + 30);

  const fullName = user.consultant || "Unnamed";
    const [firstName, lastName] = fullName.trim().split(" ");
    const namePart = `${firstName}-${lastName || ""}`; // handles missing last name

    const start = new Date(startDate);
    const month = start.toLocaleString('default', { month: 'long' });
    const year = start.getFullYear();

    const fileName = `${namePart}-${month}-${year}-ActivityReport.pdf`;



    // Save and render
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    setPdfFileName(fileName);

    };


    return (
  <>
    <Navigation title="Export Timesheet" />

    <div className="p-6">
      {!startDate || !endDate ? (
        <p className="text-gray-500 italic mb-4">
          Please select both start and end dates to filter entries.
        </p>
      ) : null}

      {/* Combined flex layout */}
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Left column */}
        <div className="flex flex-col space-y-4 w-full lg:w-1/3">
          <label className="font-medium">
            Enter start date <br />
            <input
              type="date"
              value={startDate}
              required
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full border border-cove-500 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-oasis-50"
            />
          </label>

          <label className="font-medium">
            Enter end date <br />
            <input
              type="date"
              value={endDate}
              required
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full border border-cove-500 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-oasis-50"
            />
          </label>

          <TimesheetList
            startDate={startDate}
            endDate={endDate}
            onFilter={handleFilteredEntries}
          />
          
        <button
            onClick={() => generatePDF(filtered!, startDate, endDate, user)}
            disabled={!startDate || !endDate || !filtered || filtered.length === 0}
            className={`bg-cove-500 text-white rounded-md py-2 px-4 hover:bg-cove-700 transition cursor-pointer
                disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400`}
            >
            Generate PDF preview
        </button>

        <a
            href={pdfUrl || '#'}
            download={pdfFileName}
            className={`flex items-center justify-center bg-cove-500 gap-2 text-center text-white rounded-md py-2 px-4 hover:bg-cove-700 transition
                ${!pdfUrl ? 'pointer-events-none bg-gray-400 cursor-not-allowed hover:bg-gray-400' : ''}`}
            >
                <MdOutlineFileDownload className="text-xl" />
            <span>Download PDF</span>
        </a>

        </div>

        {/* Right column */}
        <div className="w-full">
          {pdfUrl && (
                <iframe src={pdfUrl} className="w-full h-[600px]" title="PDF Preview"  />
          )}
        </div>
      </div>
    </div>
  </>
);

}


