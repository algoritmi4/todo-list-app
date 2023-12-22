/* eslint-disable @typescript-eslint/no-explicit-any */
import { MRT_ColumnDef, useMaterialReactTable } from "material-react-table";
import { useMemo } from "react";

function TableOptions({ data }: { data: any }) {

  const columns: MRT_ColumnDef<any>[] = useMemo(
    () => [
      {
        header: 'Задача',
        accessorKey: 'name',
        size: 800,
      },
      {
        header: 'Приоритет',
        accessorFn: (data) => <p
          className={`table-options__importance ${data.priority === 'Высокий'
            ? 'important'
            : data.priority === 'Средний'
              ? 'postponed'
              : 'not-important'}`}
        >{data.priority}</p>
      },
      {
        header: 'Выполнить до',
        accessorKey: 'date',
        sortingFn: 'datetime'
      },
      {
        header: 'Статус',
        accessorFn: (data) => <p
          className={`table-options__status ${ data.status === 'Выполнено' ? 'done' : data.status === 'В процессе' ? 'process' : 'need-start'}`}
        >&#8226; {data.status}</p>
      }
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      showColumnFilters: true,
    },
    enableFullScreenToggle: false,
    enableBottomToolbar: false,
    enableRowDragging: true,
    enableRowSelection: true,
    enableDensityToggle: false,
    enableGlobalFilter: false,
    enableColumnFilters: true,
    enableRowNumbers: true,
    muiTableBodyRowProps: () => ({
      onClick: () => {
      },
      sx: {
        cursor: 'pointer'
      }
    }),
    muiTableBodyCellProps: {
      sx: {
        borderRight: '2px solid #e0e0e0',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        fontSize: '15px'
      }
    },
    muiTableHeadCellProps: {
      sx: {
        fontSize: '16px',
        borderRight: '2px solid #e0e0e0',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }
    },
  })

  return { table };
}

export default TableOptions;