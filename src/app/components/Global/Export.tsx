import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';


type SelectDate = {
    startDate: string;
    endDate: string;
};

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';


export default function Export(){
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>My Simple Modal</DialogTitle>
        <DialogContent>
          This is the content inside the modal.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* You can add a confirm button here if you want */}
        </DialogActions>
      </Dialog>
    </>
  );
}

const exportTimesheetToPDF = (entries: Entry[]) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text('Timesheet Report', 14, 22);

  // Table
  autoTable(doc, {
    startY: 30,
    head: [['Date', 'Project', 'Task', 'Hours']],
    body: entries.map((e) => [
      e.date,
      e.project,
      e.taskDescription,
      String(e.hours),
    ]),
  });

  const finalY = doc.lastAutoTable.finalY ?? 40;

  // Signature Box
  doc.setDrawColor(0);
  doc.rect(14, finalY + 20, 80, 30); // x, y, width, height
  doc.text('Signature:', 14, finalY + 18);

  // Footer
  doc.setFontSize(10);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 290);

  doc.save('timesheet.pdf');
};
