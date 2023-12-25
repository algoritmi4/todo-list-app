import { ISortState } from "../utils/interfaces/SortState.interface";

function TableTitle({ sortState, handleSortTasks }: { sortState: ISortState; handleSortTasks: (prop: string, order: number) => void }) {
  return (
    <div className="text-white border-2 rounded flex items-center max-h-8 w-full box-border px-1.5 py-1 mt-5 mb-10 border-blue cursor-default hover:opacity-100">
      <p className="text-ellipsis overflow-hidden whitespace-nowrap w-1/2">Название</p>
      <div className="w-1/6">
        <p className="flex justify-center items-center text-center bg-transparent">
          Приоритет<div id="priority" onClick={(e) => handleSortTasks(e.currentTarget.id, sortState.priority)} className={`${ sortState.priority === 1 ? "bg-down-arr" : sortState.priority === 2 ? "bg-up-arr" : "bg-arrows" } bg-transparent bg-no-repeat bg-cover bg-center ml-2 w-4 h-4 cursor-pointer`}></div>
        </p>
      </div>
      <div className="w-1/6">
        <p className="flex justify-center items-center text-center bg-transparent">
          Выполнить до<div id="date" onClick={(e) => handleSortTasks(e.currentTarget.id, sortState.date)} className={`${ sortState.date === 1 ? "bg-down-arr" : sortState.date === 2 ? "bg-up-arr" : "bg-arrows" } bg-transparent bg-no-repeat bg-cover bg-center ml-2 w-4 h-4 cursor-pointer`}></div>
        </p>
      </div>
      <div className="w-1/6">
        <p className="flex justify-center items-center text-center bg-transparent">
          Статус<div id="status" onClick={(e) => handleSortTasks(e.currentTarget.id, sortState.status)} className={`${ sortState.status === 1 ? "bg-down-arr" : sortState.status === 2 ? "bg-up-arr" : "bg-arrows" } bg-transparent bg-no-repeat bg-cover bg-center ml-2 w-4 h-4 cursor-pointer`}></div>
        </p>
      </div>
    </div>
  );
}

export default TableTitle;