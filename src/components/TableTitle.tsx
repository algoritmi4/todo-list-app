import { ISortState } from "../utils/interfaces/SortState.interface";

function TableTitle({ sortState, handleSortTasks }: { sortState: ISortState; handleSortTasks: (prop: string, order: number) => void }) {
  return (
    <div className="text-white border-2 rounded flex items-center max-h-8 w-full box-border px-1.5 py-1 mt-5 mb-10 border-blue cursor-default hover:opacity-100 xl:text-sm lg:text-xs lg:mt-4 lg:mb-8 md:mt-3 md:mb-6">
      <p className="text-ellipsis overflow-hidden whitespace-nowrap w-1/2 xl:w-1/3 lg:w-1/4 md:w-1/3 sm:w-2/3">Название</p>
      {
        Object.keys(sortState).map((el, index) => (
          <div key={index} className={`w-1/6 xl:w-[22.22%] lg:w-1/4 md:w-1/3 ${el === 'date' ? "md:hidden" : el === 'status' ? "sm:hidden" : ""}`}>
            <div className="flex justify-center items-center text-center bg-transparent">{el === 'priority' ? "Приоритет" : el === 'date' ? "Выполнить до" : "Статус"}
              <div id={el} onClick={(e) => handleSortTasks(e.currentTarget.id, sortState[el as keyof ISortState])} className={`${ sortState[el as keyof ISortState] === 1 ? "bg-down-arr" : sortState[el as keyof ISortState] === 2 ? "bg-up-arr" : "bg-arrows" } bg-transparent bg-no-repeat bg-cover bg-center ml-2 w-4 h-4 cursor-pointer xl:ml-0.5 xl:w-3 xl:h-3`}></div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default TableTitle;