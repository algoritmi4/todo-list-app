import { useEffect, useState } from 'react';
import cosmos from '../images/cosmos.jpg';
import EditPopup from './EditPopup';
import Header from './Header';
import Todo from './Todo';
import { ICard } from '../utils/interfaces/Card.interface';
import EditPopupOptions from '../utils/interfaces/EditPopupOptions.interface';
import api from '../utils/api';
import { ISortState } from '../utils/interfaces/SortState.interface';
import { INITIAL_SORT_STATE } from '../utils/constants';

function App() {
  const [editPopup, setEditPopup] = useState<EditPopupOptions>({isOpen: false, isCreating: true, card: {
    name: '',
    priority: null,
    date: '',
    status: null
  }});
  const [data, setData] = useState<ICard[]>([]);
  const [sortState, setSortState] = useState<ISortState>(INITIAL_SORT_STATE);

  useEffect(() => {
    handleGetTasks();
  }, [])

  function handleSortTasks(prop: string, order: number) {
    if (order === 2) {
      api.getTasks()
      .then((res) => {
        const newSortOrder = 3;
        const obj: ISortState = INITIAL_SORT_STATE;
  
        Object.keys(sortState).forEach((el) => {
          if (el !== prop) {
            obj[el as keyof ISortState] = 3;
          } else {
            obj[el as keyof ISortState] = newSortOrder;
          }
        })
    
        setSortState(obj);
        setData(res);
      })
      .catch((err)=> console.log(err))
    } else {
      const sortOrder = order === 3 ? 'desc' : order === 1 ? 'asc' : '';

      api.getSortedTasks(prop, sortOrder)
      .then((res) => {
        const newSortOrder = order === 3 ? 1 : order + 1;
        const obj: ISortState = INITIAL_SORT_STATE;
  
        Object.keys(sortState).forEach((el) => {
          if (el !== prop) {
            obj[el as keyof ISortState] = 3;
          } else {
            obj[el as keyof ISortState] = newSortOrder;
          }
        })
    
        setSortState(obj);
        setData(res);
      })
      .catch((err) => console.log(err));
    }
  }

  function handleGetTasks() {
    api.getTasks()
    .then((res) => setData(res))
    .catch((err)=> console.log(err));
  }

  function handleOpenEditPopup(card: ICard) {
    setEditPopup({isOpen: true, isCreating: false, card});
  }

  function handleOpenCreatePopup() {
    setEditPopup(({isOpen: true, isCreating: true, card: {
      name: '',
      priority: null,
      date: '',
      status: null
    }}));
  }

  function handleCloseEditPopup() {
    setEditPopup((state) => ({...state, isOpen: false}));
  }

  function handleAddTask(card: ICard) {
    api.addTask(card)
    .then((res) => {
      setData((state) => ([...state, res]));
      handleCloseEditPopup();
    })
    .catch((err) => console.log(err));
  }

  function handleDeleteTask(id: number) {
    api.deleteTask(id)
    .then(() => {
      setData((state) => state.filter((el) => el.id !== id));
      handleCloseEditPopup();
    })
    .catch((err) => console.log(err));
  }

  function handleEditTask(id: number, card: ICard) {
    api.editTask(id, card)
    .then((res) => {
      setData((state) => {
        return state.map((el) => {
          if (el.id === res.id) {
            return res;
          }

          return el;
        })
      });

      handleCloseEditPopup();
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="page bg-gray-dark text-white">
      <div className="page__content">
        <EditPopup
          editPopup={ editPopup }
          handleCloseEditPopup={ handleCloseEditPopup }
          handleAddTask={ handleAddTask }
          handleDeleteTask={ handleDeleteTask }
          handleEditTask={ handleEditTask }
        />
        <Header />
        <img src={cosmos} className="w-full h-80 object-cover" alt="Фото Земли" />
        <Todo
          data={ data }
          sortState={ sortState }
          handleOpenEditPopup={ handleOpenEditPopup }
          handleOpenCreatePopup={ handleOpenCreatePopup }
          handleSortTasks={ handleSortTasks }
        />
      </div>
    </div>
  )
}

export default App
