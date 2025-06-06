'use client'
import { useEffect, lazy, Suspense, useState, useMemo } from "react"
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from 'material-react-table';
import '../../styles/login.css'
import '../../styles/table.css'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type EntryApiResponse = {
  data: Array<Entry>;
  meta: {
    totalRowCount: number;
  };
};


export default function TimesheetTable(){
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    //fetching state
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);

    //table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

    const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
    const [editedEntries, setEditedEntries] = useState<Record<string, Entry>>({});


    useEffect(() => {
        const fetchEntries = async () => {
            console.log(entries);
        if (!entries.length) {
            setIsLoading(true);
        } else {
            setIsRefetching(true);
        }

        const url = new URL('/api/entries', location.origin);
        url.searchParams.set(
            'start',
            `${pagination.pageIndex * pagination.pageSize}`,
        );
        url.searchParams.set('size', `${pagination.pageSize}`);
        url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
        url.searchParams.set('globalFilter', globalFilter ?? '');
        url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

        try {
            const response = await fetch(url.href);
            const data = (await response.json()) as EntryApiResponse;
            setEntries(data.list);
            setRowCount(data.pageInfo.totalRows);
        } catch (error) {
            setIsError(true);
            console.error(error);
            return;
        }
        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);
        };
        fetchEntries();

    }, [
        columnFilters, //re-fetch when column filters change
        globalFilter, //re-fetch when global filter changes
        pagination.pageIndex, //re-fetch when page index changes
        pagination.pageSize, //re-fetch when page size changes
        sorting, //re-fetch when sorting changes
    ]);

    const columns = useMemo<MRT_ColumnDef<Entry>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Date',
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: 'date',
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited entry in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? 'Required'
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedEntries({ ...editedEntries, [row.id]: row.original });
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
          
          //store edited entry in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? 'Required'
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedEntries({ ...editedEntries, [row.id]: row.original });
          },
        }),
        
      },
      {
        accessorKey: 'taskType',
        header: 'Task Type',
        muiEditTextFieldProps: ({ cell, row }) => ({
          select: true,
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          onChange: (event) => {
            const newValue = event.target.value;

            setEditedEntries((prev) => ({
              ...prev,
              [row.id]: {
                ...row.original,
                [cell.column.id]: newValue, 
              },
            }));

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
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: 'text',
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited entry in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? 'Required'
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedEntries({ ...editedEntries, [row.id]: row.original });
          },
        }),
      },
      {
        accessorKey: 'hours',
        header: 'Hours',
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: 'number',
          required: true,
          error: !!validationErrors?.[cell.id],
          helperText: validationErrors?.[cell.id],
          //store edited entry in state to be saved later
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? 'Required'
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedEntries({ ...editedEntries, [row.id]: row.original });
          },
        }),
      },
    ],
    [editedEntries, validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createEntry, isPending: isCreatingEntry } =
    useCreateEntry();
  //call READ hook
  const {
    data: fetchedEntries = [],
    isError: isLoadingEntriesError,
    isFetching: isFetchingEntries,
    isLoading: isLoadingEntries,
  } = useGetEntries();
  //call UPDATE hook
  const { mutateAsync: updateEntries, isPending: isUpdatingEntries } =
    useUpdateEntries();
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

  //UPDATE action
  const handleSaveEntries = async () => {
    if (Object.values(validationErrors).some((error) => !!error)) return;
    await updateEntries(Object.values(editedEntries));
    setEditedEntries({});
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<Entry>) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(row.original.Id);
    }
  };

const table = useMaterialReactTable({
    columns,
    data: fetchedEntries,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'table', // ('modal', 'row', 'cell', and 'custom' are also
    enableEditing: true,
    enableRowActions: true,
    positionActionsColumn: 'last',
    getRowId: (row) => row.Id,
    muiToolbarAlertBannerProps: isLoadingEntriesError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateEntry,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderBottomToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button
          color="success"
          variant="contained"
          onClick={handleSaveEntries}
          disabled={
            Object.keys(editedEntries).length === 0 ||
            Object.values(validationErrors).some((error) => !!error)
          }
        >
          {isUpdatingEntries ? <CircularProgress size={25} /> : 'Save'}
        </Button>
        {Object.values(validationErrors).some((error) => !!error) && (
          <Typography color="error">Fix errors before submitting</Typography>
        )}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New Entry
      </Button>
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
      //send api update request here
      const res = await fetch('/api/entries', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        });
    },
    //client side optimistic update
    onMutate: (newEntryInfo: Entry) => {
      queryClient.setQueryData(
        ['entries'],
        (prevEntries: any) =>
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

//READ hook (get entries from api)
function useGetEntries() {
  return useQuery<Entry[]>({
    queryKey: ['entries'],
    queryFn: async () => {
    const response = await fetch('/api/entries');
      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }
      const data = await response.json();
      return data.list; 
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put entry in api)
function useUpdateEntries() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entries: Entry[]) => {
  const results = await Promise.all(
    entries.map(async (entry) => {
      const res = await fetch('/api/entries', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
       body: JSON.stringify({
        Id: entry.Id,
        date: entry.date,
        taskDescription: entry.taskDescription,
        taskType: entry.taskType,
        project: entry.project,
        hours: entry.hours,
      }),
      });

      const json = await res.json();
      console.log('PATCH response:', json); // <= ici

      if (!res.ok) {
        throw new Error(json?.error ?? JSON.stringify(json) ?? 'Failed to update entries');
      }

      return json;
    })
  );
  return results;
},

    //client side optimistic update
    onMutate: (newEntries: Entry[]) => {
      queryClient.setQueryData(['entries'], (prevEntries: any) =>
        prevEntries?.map((entry: Entry) => {
          const newEntry = newEntries.find((u) => u.Id === entry.Id);
          return newEntry ? newEntry : entry;
        }),
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['entries'] }), //refetch entries after mutation, disabled for demo
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
      queryClient.setQueryData(['entries'], (prev: any) =>
        prev?.filter((entry: Entry) => entry.Id !== entryId)
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