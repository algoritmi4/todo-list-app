import logo from '../images/book-logo.svg';
import Card from './Card';
import { ICard } from '../utils/interfaces/Card.interface';
import loupeIcon from '../images/loupe-icon.png';
import { FormEvent, useState } from 'react';
import TableTitle from './TableTitle';
import { ISortState } from '../utils/interfaces/SortState.interface';

function Todo({
  data,
  sortState,
  handleOpenEditPopup,
  handleOpenCreatePopup,
  handleSortTasks
}: {
  data: ICard[];
  sortState: ISortState;
  handleOpenEditPopup: (card: ICard) => void;
  handleOpenCreatePopup: () => void;
  handleSortTasks: (prop: string, order: number) => void;
}) {
  const [inputValue, setInputValue] = useState<string>('');

  function handleInputValue(e: FormEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  return (
    <main className="w-2/3 mx-auto mt-12 relative box-border md:mt-8 sm:w-11/12">
      <img className="w-16 h-16 absolute top-[-90px] left-[-6px] md:top-[-74px]" src={logo} alt="Логотип" />
      <div className="w-full flex">
        <h2 className="text-white text-3xl font-normal lg:text-2xl md:text-xl sm:text-base">Список дел</h2>
        <button type="button" onClick={handleOpenCreatePopup} className="ml-3 mt-1.5 rounded-circle bg-blue w-7 h-7 flex items-center justify-center hover:opacity-70 hover:ease-linear duration-100 lg:w-6 lg:h-6 lg:ml-2 md:w-5 md:h-5 md:ml-1 sm:w-4 sm:h-4"><span className="text-2xl lg:text-xl md:text-lg md:mb-0.5 sm:mb-0.5">+</span></button>
        <label htmlFor="to-do-search" className="flex border-2 rounded-sm items-center ml-auto px-1.5 lg:border sm:px-1">
          <input type="text" id="to-do-search" value={inputValue} onChange={handleInputValue} placeholder="Поиск по задачам" className="bg-transparent outline-none py-0.5 lg:py-0 md:w-36 md:placeholder:text-sm sm:placeholder:text-xs sm:w-28 sm:h-5 sm:pb-1" />
          <img className="w-6 h-6 xl:w-5 xl:h-5 sm:w-4 sm:h-4" src={loupeIcon} alt='Поисковая лупа' />
        </label>
      </div>
      <div className="w-full box-border">
        {
          data.length > 0 ? (
            <>
              <TableTitle sortState={ sortState } handleSortTasks={ handleSortTasks } />
              {data.filter((el) => el.name.toLowerCase().includes(inputValue.toLowerCase())).map((el: ICard, index) => <Card handleOpenEditPopup={ handleOpenEditPopup } info={ el } key={ index }/>)}
            </>
          ) : <h3 className="text-center text-2xl mt-4">Список дел пуст. Если вы только что открыли страницу, то подождите 10-15 секунд пока поднимется сервер.</h3>
        }
      </div>
    </main>
  );
}

export default Todo;
