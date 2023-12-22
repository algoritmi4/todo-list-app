import logo from '../images/book-logo.svg';
import Card from './Card';
import { ICard } from '../utils/interfaces/Card.interface';
import loupeIcon from '../images/loupe-icon.png';
import { FormEvent, useState } from 'react';

const startData: ICard = {
  name: 'Название',
  priority: 'Приоритет',
  date: 'Выполнить до',
  status: 'Статус',
  startCard: true
}

function Todo({ data, handleOpenEditPopup }: { data: ICard[]; handleOpenEditPopup: () => void }) {
  const [inputValue, setInputValue] = useState<string>('');

  function handleInputValue(e: FormEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
    console.log(e.currentTarget.value);
  }

  return (
    <main className="w-full px-20 mt-12 relative box-border">
      <img className="w-16 h-16 absolute top-[-90px] left-[70px]" src={logo} alt="Логотип" />
      <div className="w-2/3 flex">
        <h2 className="text-white text-3xl font-normal">Список дел</h2>
        <button type="button" onClick={handleOpenEditPopup} className="ml-3 mt-1.5 rounded-circle bg-blue w-7 h-7 flex items-center justify-center hover:opacity-70 hover:ease-linear duration-100"><span className="text-2xl">+</span></button>
        <label htmlFor="to-do-search" className="flex border-2 rounded-sm items-center ml-auto px-1.5">
          <input type="text" id="to-do-search" value={inputValue} onChange={handleInputValue} placeholder="Поиск по задачам" className="bg-transparent outline-none py-0.5" />
          <img className="w-6 h-6" src={loupeIcon} alt='Поисковая лупа' />
        </label>
      </div>
      <div className="w-2/3 box-border">
        <Card info={ startData } handleOpenEditPopup={ handleOpenEditPopup } />
        {data.filter((el) => el.name.toLowerCase().includes(inputValue.toLowerCase())).map((el: ICard, index) => <Card handleOpenEditPopup={ handleOpenEditPopup } info={ el } key={ index }/>)}
      </div>
    </main>
  );
}

export default Todo;