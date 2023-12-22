import { useState } from 'react';
import cosmos from '../images/cosmos.jpg';
import EditPopup from './EditPopup';
import Header from './Header';
import Todo from './Todo';
import { ICard } from '../utils/interfaces/Card.interface';

function App() {
  const [editPopup, setEditPopup] = useState({isOpen: false});
  const [data, setData] = useState<ICard[]>([
    {
      name: 'Code',
      priority: 'Низкий',
      date: '23.11.2023',
      status: 'Нужно начать'
    },
    {
      name: 'Eat',
      priority: 'Высокий',
      date: '20.12.2023',
      status: 'В процессе'
    },
    {
      name: 'Sleep',
      priority: 'Средний',
      date: '21.12.2023',
      status: 'Выполнено'
    },
    {
      name: 'Repeat',
      priority: 'Средний',
      date: '21.12.2023',
      status: 'Выполнено'
    }
  ]);

  function handleOpenEditPopup() {
    setEditPopup({isOpen: true});
  }

  function handleClose() {
    setEditPopup({isOpen: false});
  }

  function handleAddTask({ name, priority, date, status }: ICard) {
    const newTask = {name, priority, date, status}
    setData((state) => ([...state, newTask]));
  }

  return (
    <div className="page bg-gray-dark text-white">
      <div className="page__content">
        <EditPopup isOpen={ editPopup.isOpen } handleClose={ handleClose } handleAddTask={ handleAddTask }/>
        <Header />
        <img src={cosmos} className="w-full h-80 object-cover" alt="Фото Земли" />
        <Todo data={ data } handleOpenEditPopup={ handleOpenEditPopup }/>
      </div>
    </div>
  )
}

export default App
