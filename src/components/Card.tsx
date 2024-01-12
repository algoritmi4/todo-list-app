import { ICard } from "../utils/interfaces/Card.interface";

function Card({ info, handleOpenEditPopup }: { info: ICard, handleOpenEditPopup: (card: ICard) => void }) {
  const date = new Date(info.date);
  const formatedDate =
  `${String(date.getDate()).length < 2 ? '0' : ''}${date.getDate()}.${String(date.getMonth()).length < 2 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear()}`

  return (
    <div className="text-white border-2 rounded flex items-center max-h-8 w-full box-border px-1.5 py-1 mt-5 cursor-pointer hover:opacity-70 hover:ease-linear duration-100 last-of-type:mb-3 xl:text-sm lg:text-xs md:max-w-[512px] md:mt-3 sm:max-w-[496px] xs:max-w-[321px]" onClick={() => handleOpenEditPopup(info)}>
      <p className="text-ellipsis overflow-hidden whitespace-nowrap w-1/2 xl:w-1/3 lg:w-1/4 md:w-1/3 sm:w-2/3">{info.name}</p>
      <div className="w-1/6 text-center xl:w-[22.22%] lg:w-1/4 md:w-1/3">
        <p className={
          `text-center rounded-sm ${info.priority === 3 ? 'bg-red' : info.priority === 2 ? 'bg-orange' : info.priority === 1 ? 'bg-green' : ''}`
        }>{info.priority === 3 ? 'Высокий' : info.priority === 2 ? 'Средний' : info.priority === 1 ? 'Низкий' : 'Приоритет'}</p>
      </div>
      <div className="w-1/6 text-center xl:w-[22.22%] lg:w-1/4 md:hidden">
        <p>{formatedDate}</p>
      </div>
      <div className="w-1/6 text-center xl:w-[22.22%] lg:w-1/4 md:w-1/3 sm:hidden">
        {
          info.status === 3 ? (
            <p className={`text-red-light`}>&#8226; Нужно начать</p>
          ) : info.status === 2 ? (
            <p className={`text-gray-light`}>&#8635; В процессе</p>
          ) : info.status === 1 ? (
            <p className={`text-green-light`}>&#10003; Выполнено</p>
          ) : (
            <p className={``}>Статус</p>
          )
        }
      </div>
    </div>
  );
}

export default Card;