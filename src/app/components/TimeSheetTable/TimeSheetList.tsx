'use client'

import { useState, useEffect } from 'react';
import { useEntries } from '../../hooks/useEntries';

type TimesheetListProps = {
    startDate: string;
    endDate: string;
    onFilter: (entries: Entry[]) => void;
}

export default function TimesheetList({startDate, endDate, onFilter}: TimesheetListProps){
    const {data: entries = []} = useEntries();
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredEntries =  entries.filter((entry: Entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= start && entryDate <= end;
    });

    useEffect(() => {
      if (!startDate && !endDate) return
      else {
        onFilter(filteredEntries);
      }
    }, [startDate, endDate, entries]);

    return (
        <>
        {filteredEntries.length === 0 && startDate && endDate ?  
        <p className="text-gray-500 italic mt-4">No entries found in the selected date range.</p>
        : ''}
        </>
    )
} 