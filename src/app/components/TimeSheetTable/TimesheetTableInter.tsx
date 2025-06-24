'use client'
import { useState, useMemo, useEffect } from "react"
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ToggleFullScreenButton,
  MRT_ToggleDensePaddingButton,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,

} from 'material-react-table';

import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
  MenuItem,
} from '@mui/material';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import DeleteIcon from '@mui/icons-material/Delete';
import { useEntries } from "@/app/hooks/useEntries";
import { Entry } from "@/app/type";
import { useNavigationGuard } from "@/app/hooks/NavigationGuardContext";


export default function TimesheetTable(){

    const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
    const [editedEntries, setEditedEntries] = useState<Record<string, Entry>>({});

    const hasUnsavedChanges =
    Object.keys(editedEntries).length > 0 ||
    Object.values(validationErrors).some((error) => !!error);

    const { setHasUnsavedChanges } = useNavigationGuard();

  // Warn before unload (refresh/close tab/navigation)
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  useEffect(() => {
  setHasUnsavedChanges(
    Object.keys(editedEntries).length > 0 ||
    Object.values(validationErrors).some(Boolean)
  );
}, [editedEntries, validationErrors]);

    const columns = useMemo<MRT_ColumnDef<Entry>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Date',
        size: 110,
        sx: {
          backgroundColor: '#1e1e1e',
          color: '#ccc',
          '& input': {
            color: '#ccc',
          },
          '& .MuiSvgIcon-root': {
            color: '#ccc', // calendar icon color
          },
        },
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: 'date',
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          onChange: (event) => {
            const newValue = event.target.value;

            setEditedEntries((prev) => {
              const existing = prev[row.id] ?? row.original;
              return {
                ...prev,
                [row.id]: {
                  ...existing,
                  [cell.column.id]: newValue,
                },
              };
            });

            if (validationErrors?.[cell.id]) {
              setValidationErrors((prev) => ({
                ...prev,
                [cell.id]: undefined,
              }));
            }
          },
          onBlur: (event) => {
            const isValid = validateRequired(event.currentTarget.value);
            setValidationErrors((prev) => ({
              ...prev,
              [cell.id]: isValid ? undefined : 'Required',
            }));
          },
        }),
      },
      {
        accessorKey: 'taskDescription',
        header: 'Task Description',
        
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: 'text',
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          onChange: (event) => {
            const newValue = event.target.value;

            setEditedEntries((prev) => {
              const existing = prev[row.id] ?? row.original;
              return {
                ...prev,
                [row.id]: {
                  ...existing,
                  [cell.column.id]: newValue,
                },
              };
            });

            if (validationErrors?.[cell.id]) {
              setValidationErrors((prev) => ({
                ...prev,
                [cell.id]: undefined,
              }));
            }
          },
          onBlur: (event) => {
            const isValid = validateRequired(event.currentTarget.value);
            setValidationErrors((prev) => ({
              ...prev,
              [cell.id]: isValid ? undefined : 'Required',
            }));
          },
        }),
      },
      {
        accessorKey: 'taskType',
        header: 'Task Type',
        size: 75 ,
        muiEditTextFieldProps: ({ cell, row }) => ({
          select: true,
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
                    onChange: (event) => {
            const newValue = event.target.value;

            setEditedEntries((prev) => {
              const existing = prev[row.id] ?? row.original;
              return {
                ...prev,
                [row.id]: {
                  ...existing,
                  [cell.column.id]: newValue,
                },
              };
            });

            if (validationErrors?.[cell.id]) {
              setValidationErrors((prev) => ({
                ...prev,
                [cell.id]: undefined,
              }));
            }
          },
          onBlur: (event) => {
            const isValid = validateRequired(event.currentTarget.value);
            setValidationErrors((prev) => ({
              ...prev,
              [cell.id]: isValid ? undefined : 'Required',
            }));
          },
          children: [
            <MenuItem key="dev" value="Development">Development</MenuItem>,
            <MenuItem key="disc" value="Discovery">Discovery</MenuItem>
          ],
        }),
      },
      {
        accessorKey: 'project',
        header: 'Project',
        size: 100,

        muiEditTextFieldProps: ({ cell, row }) => ({
          type: 'text',
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          onChange: (event) => {
            const newValue = event.target.value;

            setEditedEntries((prev) => {
              const existing = prev[row.id] ?? row.original;
              return {
                ...prev,
                [row.id]: {
                  ...existing,
                  [cell.column.id]: newValue,
                },
              };
            });

            if (validationErrors?.[cell.id]) {
              setValidationErrors((prev) => ({
                ...prev,
                [cell.id]: undefined,
              }));
            }
          },
          onBlur: (event) => {
            const isValid = validateRequired(event.currentTarget.value);
            setValidationErrors((prev) => ({
              ...prev,
              [cell.id]: isValid ? undefined : 'Required',
            }));
          },
        }),
      },
      {
        accessorKey: 'hours',
        header: 'Time',
        maxSize: 55,
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: 'number',
          required: true,
          sx:{textAlign: "right"},
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          onChange: (event) => {
            const newValue = event.target.value;

            setEditedEntries((prev) => {
              const existing = prev[row.id] ?? row.original;
              return {
                ...prev,
                [row.id]: {
                  ...existing,
                  [cell.column.id]: newValue,
                },
              };
            });

            if (validationErrors?.[cell.id]) {
              setValidationErrors((prev) => ({
                ...prev,
                [cell.id]: undefined,
              }));
            }
          },
          onBlur: (event) => {
            const isValid = validateRequired(event.currentTarget.value);
            setValidationErrors((prev) => ({
              ...prev,
              [cell.id]: isValid ? undefined : 'Required',
            }));
          },
        }),
      },
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createEntry, isPending: isCreatingEntry } =
    useCreateEntry();
  //call READ hook
  const {
    data: entries = [],
    isError: isLoadingEntriesError,
    isFetching: isFetchingEntries,
    isLoading: isLoadingEntries,
  } = useEntries();
  //call UPDATE hook
  const { mutateAsync: updateEntries, isPending: isUpdatingEntries } =
    useUpdateEntry();
  //call DELETE hook
  const { mutateAsync: deleteEntry, isPending: isDeletingEntry } =
    useDeleteEntry();

  //CREATE action
  const handleCreateEntry: MRT_TableOptions<Entry>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateEntry(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createEntry(values);
    table.setCreatingRow(null); //exit creating mode
  };

const handleSaveEntries = async () => {
  if (Object.values(validationErrors).some((error) => !!error)) return;
  
  // Update all entries in parallel
  const entriesToUpdate = Object.values(editedEntries);

  console.log(editedEntries);
  
  try {
    
     await Promise.all(
      entriesToUpdate.map(entry => updateEntries(entry))
    );
    
    setEditedEntries({});
    console.log('All entries updated successfully!');
  }catch (e: unknown) {
      const error = e as Error;
    console.error('Error updating entries:', error);
    // Optionally show user feedback here
  }
};

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<Entry>) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(String(row.original.Id));
    }
  };

const table = useMaterialReactTable({
muiTablePaperProps: {
  sx: {
    backgroundColor: '#0D1321',
  },
},
muiTopToolbarProps: {
  sx: {
    backgroundColor: '#0D1321',
    color: '#ccc',
    '& .MuiTypography-root': {
      color: '#ccc',
    },
    '& .MuiSvgIcon-root': {
      color: '#ccc',
    },
  },
},
muiBottomToolbarProps: {
  sx: {
    backgroundColor: '#0D1321',
    color: '#ccc',
    '& .MuiTypography-root': {
      color: '#ccc',
    },
    '& .MuiSvgIcon-root': {
      color: '#ccc',
    },
    '& .MuiFormLabel-root': {
      color: '#ccc',
    },
    '*': {
      color: '#ccc !important', // deeply apply color to all children
      fill: '#ccc !important',  // ensure icons also respect it
    },
    '& input': {
      color: '#ccc',
      backgroundColor: '#ccc',
    },
  },
},
muiTableHeadProps: {
  sx: {
    backgroundColor: '#0D1321',
    color: '#ccc !important',
    borderColor: '#333',
    '& .MuiTypography-root': {
      color: '#f4f7fa',
    },
    '& .MuiSvgIcon-root': {
      color: '#f4f7fa',
    },
    '*': {
      color: '#f4f7fa !important', // deeply apply color to all children
      fill: '#f4f7fa !important',  // ensure icons also respect it
    },
  },
},
muiTableHeadCellProps: {
  sx: {
    backgroundColor: '#0D1321',
    borderColor: '#333',
    '& .MuiTypography-root': {
      color: '#f4f7fa',
    },
    '& .MuiSvgIcon-root': {
      color: '#f4f7fa',
    },
    '*': {
      color: '#f4f7fa !important', // deeply apply color to all children
      fill: '#f4f7fa !important',  // ensure icons also respect it
    },

  },
},
muiTableBodyCellProps: {
  sx: {
    backgroundColor: '#0D1321',
    color: '#ccc !important',
    borderColor: '#333',
    '& .MuiTypography-root': {
      color: '#f4f7fa',
    },
    '& .MuiSvgIcon-root': {
      color: '#f4f7fa',
    },
      '& .MuiTableCell-root': {
      color: '#f4f7fa',
    },
    '*': {
      color: '#f4f7fa !important', // deeply apply color to all children
      fill: '#f4f7fa !important',  // ensure icons also respect it
    },
  },
},
muiTableBodyRowProps: {
  sx: {
    backgroundColor: '#1e1e1e',
    color: '#f4f7fa !important',
    borderColor: '#333',
    '& .MuiTypography-root': {
      color: '#f4f7fa',
    },
    '& .MuiSvgIcon-root': {
      color: '#f4f7fa',
    },
     '&:hover': {
      backgroundColor: '#2a2a2a', // hover color
    },
    '*': {
      color: '#f4f7fa !important', // deeply apply color to all children
      fill: '#f4f7fa !important',  // ensure icons also respect it
    },
  },
},

    columns,
    data: entries,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'table', // ('modal', 'row', 'cell', and 'custom' are also
    enableEditing: true,
    enableDensityToggle: false,
    enableStickyHeader: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    layoutMode: 'grid',
    renderToolbarInternalActions: ({ table }) => (
      <Box>
        {/* along-side built-in buttons in whatever order you want them */}
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
      </Box>
    ),
    getRowId: (row) => String(row.Id),
    muiToolbarAlertBannerProps: isLoadingEntriesError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '50px',
      },
    },
  
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateEntry,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon className="text-gray-600" />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderBottomToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center'}}>
        <button
        className="text-cove-50 bg-custom-300 rounded p-2 px-3 mt-1 ml-3 hover:text-white hover:bg-linear-40 from-malachite-500 to-ntb-800 "
          color="success"
          onClick={handleSaveEntries}
          disabled={
            Object.keys(editedEntries).length === 0 ||
            Object.values(validationErrors).some((error) => !!error)
          }
        >
          {isUpdatingEntries ? <CircularProgress size={25} /> : 'Save'}
        </button>
        {Object.values(validationErrors).some((error) => !!error) && (
          <Typography color="error">Fix errors before submitting</Typography>
        )}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <div className=" flex">
      <button
        className="text-cove-50 bg-custom-300 rounded p-2 px-3 mt-1 ml-3 hover:text-white hover:bg-linear-40 from-malachite-500 to-ntb-800 "
        onClick={() => {
          table.setCreatingRow(true); 
        }}
      >
        Create New Entry
      </button>
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center'}}>
        <button
        className="text-cove-50 bg-custom-300 rounded p-2 px-3 mt-1 ml-3 hover:text-white hover:bg-linear-40 from-malachite-500 to-ntb-800 "
          color="success"
          onClick={handleSaveEntries}
          disabled={
            Object.keys(editedEntries).length === 0 ||
            Object.values(validationErrors).some((error) => !!error)
          }
        >
          {isUpdatingEntries ? <CircularProgress size={25} /> : 'Save'}
        </button>
        {Object.values(validationErrors).some((error) => !!error) && (
          <Typography color="error">Fix errors before submitting</Typography>
        )}
      </Box>
      </div>
    ),
    state: {
      isLoading: isLoadingEntries,
      isSaving: isCreatingEntry || isUpdatingEntries || isDeletingEntry,
      showAlertBanner: isLoadingEntriesError,
      showProgressBars: isFetchingEntries,
    },
  });

  return <MaterialReactTable table={table} />;
};

function useCreateEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: Entry) => {
     await fetch('/api/entries', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        });
    },
    
    //client side optimistic update
    onMutate: (newEntryInfo: Entry) => {
      queryClient.setQueryData<Entry[]>(
        ['entries'],
        (prevEntries = [] ) =>
          [
            ...prevEntries,
            {
              ...newEntryInfo,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as Entry[],
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['entries'] }), //refetch entries after mutation, disabled for demo
  });
}


//UPDATE hook (put entry in api)
function useUpdateEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entry: Entry) => {
      const res = await fetch('/api/entries', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entry),
        });

        if (!res.ok) {
        throw new Error('Failed to update entry');
      }
      return res.json();
    },
    //client side optimistic update
    onMutate: (newEntryInfo: Entry) => {
      queryClient.setQueryData<Entry[]>(['entries'], (prevEntries) =>
        prevEntries?.map((prevEntry: Entry) =>
          prevEntry.Id === newEntryInfo.Id ? newEntryInfo : prevEntry,
        ),
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['entries'] }), 
  });
}

//DELETE hook (delete entry in api)
function useDeleteEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entryId: string) => {
      const res = await fetch('/api/entries', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Id: entryId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete entry');
      }

      return res.json();
    },
    onMutate: (entryId: string) => {
      queryClient.setQueryData(['entries'], (prev: Entry[] | undefined) =>
        prev?.filter((entry: Entry) => entry.Id !== Number(entryId))
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
}

const validateRequired = (value: string) => value !== '';

function validateEntry(entry: Entry) {
  return {
    date: !validateRequired(entry.date) ? 'Date is Required': '',
    taskDescription: !validateRequired(entry.taskDescription) ? 'Task Description is Required' : '',
    taskType: !validateRequired(entry.taskType) ? 'Task Type is Required' : '',
    project: !validateRequired(entry.project) ? 'Project is Required': '',
    hours: !validateRequired(entry.hours) ? 'Hours are Required': '',
  };
}