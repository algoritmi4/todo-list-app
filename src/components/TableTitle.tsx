import { ISortState } from "../utils/interfaces/SortState.interface";

function TableTitle({ sortState, handleSortTasks }: { sortState: ISortState; handleSortTasks: (prop: string, order: number) => void }) {
  return (
    <div className="text-white border-2 rounded flex items-center max-h-8 w-full box-border px-1.5 py-1 mt-5 mb-10 border-blue cursor-default hover:opacity-100">
      <p className="text-ellipsis overflow-hidden whitespace-nowrap w-1/2">Название</p>
      {
        Object.keys(sortState).map((el, index) => (
          <div key={index} className="w-1/6">
            <div className="flex justify-center items-center text-center bg-transparent">{el === 'priority' ? "Приоритет" : el === 'date' ? "Выполнить до" : "Статус"}
              <div id={el} onClick={(e) => handleSortTasks(e.currentTarget.id, sortState[el as keyof ISortState])} className={`${ sortState[el as keyof ISortState] === 1 ? "bg-down-arr" : sortState[el as keyof ISortState] === 2 ? "bg-up-arr" : "bg-arrows" } bg-transparent bg-no-repeat bg-cover bg-center ml-2 w-4 h-4 cursor-pointer`}></div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default TableTitle;