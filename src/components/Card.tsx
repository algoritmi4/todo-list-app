import { ICard } from "../utils/interfaces/Card.interface";

function Card({ info, handleOpenEditPopup }: { info: ICard, handleOpenEditPopup: (card: ICard) => void }) {
  const date = new Date(info.date);
  const formatedDate =
  `${String(date.getDate()).length < 2 ? '0' : ''}${date.getDate()}.${String(date.getMonth()).length < 2 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear()}`

  return (
    <div className="text-white border-2 rounded flex items-center max-h-8 w-full box-border px-1.5 py-1 mt-5 cursor-pointer hover:opacity-70 hover:ease-linear duration-100 last-of-type:mb-3" onClick={() => handleOpenEditPopup(info)}>
      <p className="text-ellipsis overflow-hidden whitespace-nowrap w-1/2">{info.name}</p>
      <div className="w-1/6">
        <p className={
          `text-center rounded-sm ${info.priority === 3 ? 'bg-red' : info.priority === 2 ? 'bg-orange' : info.priority === 1 ? 'bg-green' : ''}`
        }>{info.priority === 3 ? 'Высокий' : info.priority === 2 ? 'Средний' : info.priority === 1 ? 'Низкий' : 'Приоритет'}</p>
      </div>
      <div className="w-1/6">
        <p className="text-center">{formatedDate}</p>
      </div>
      <div className="w-1/6">
        {
          info.status === 3 ? (
            <p className={`text-center text-red-light`}>&#8226; Нужно начать</p>
          ) : info.status === 2 ? (
            <p className={`text-center text-gray-light`}>&#8635; В процессе</p>
          ) : info.status === 1 ? (
            <p className={`text-center text-green-light`}>&#10003; Выполнено</p>
          ) : (
            <p className={`text-center`}>Статус</p>
          )
        }
      </div>
    </div>
  );
}

export default Card;