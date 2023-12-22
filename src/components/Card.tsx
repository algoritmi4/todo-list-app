import { ICard } from "../utils/interfaces/Card.interface";

function Card({ info, handleOpenEditPopup }: { info: ICard, handleOpenEditPopup: () => void }) {
  return (
    <div className={
      `text-white border-2 rounded flex items-center max-h-8 w-full box-border px-1.5 py-1 mt-5 ${info.startCard ? "mb-10 border-blue cursor-default hover:opacity-100" : "cursor-pointer hover:opacity-70 hover:ease-linear duration-100"}`
    } onClick={!info.startCard ? () => handleOpenEditPopup() : undefined}>
      <p className="text-ellipsis overflow-hidden whitespace-nowrap w-1/2">{info.name}</p>
      <div className="w-1/6">
        <p className={
          `text-center rounded-sm ${info.startCard ? 'bg-transparent' : ''}
          ${info.priority === 'Высокий' ? 'bg-red' : info.priority === 'Средний' ? 'bg-orange' : info.priority === 'Низкий' ? 'bg-green' : ''}`
        }>{info.priority}</p>
      </div>
      <div className="w-1/6">
        <p className="text-center">{info.date}</p>
      </div>
      <div className="w-1/6">
        <p className="text-center">{info.status}</p>
      </div>
    </div>
  );
}

export default Card;