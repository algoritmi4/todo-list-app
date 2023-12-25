function TableTitle() {
  return (
    <div className="text-white border-2 rounded flex items-center max-h-8 w-full box-border px-1.5 py-1 mt-5 mb-10 border-blue cursor-default hover:opacity-100">
      <p className="text-ellipsis overflow-hidden whitespace-nowrap w-1/2">Название</p>
      <div className="w-1/6">
        <p className="text-center rounded-sm bg-transparent">Приоритет<div className=""></div></p>
      </div>
      <div className="w-1/6">
        <p className="text-center">Выполнить до<div className=""></div></p>
      </div>
      <div className="w-1/6">
        <p className="text-center">Статус<div className=""></div></p>
      </div>
    </div>
  );
}

export default TableTitle;