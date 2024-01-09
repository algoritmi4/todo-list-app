import { useEffect, useState } from 'react';
import cosmos from '../images/cosmos.jpg';
import EditPopup from './EditPopup';
import Header from './Header';
import Todo from './Todo';
import { ICard } from '../utils/interfaces/Card.interface';
import EditPopupOptions from '../utils/interfaces/EditPopupOptions.interface';
import { api } from '../utils/api';
import { ISortState } from '../utils/interfaces/SortState.interface';
import { INITIAL_EDIT_POPUP_STATE, INITIAL_SORT_STATE } from '../utils/constants';

function App() {
  const [editPopup, setEditPopup] = useState<EditPopupOptions>({isOpen: false, isCreating: true, card: INITIAL_EDIT_POPUP_STATE});
  const [data, setData] = useState<ICard[]>([]);
  const [sortState, setSortState] = useState<ISortState>(INITIAL_SORT_STATE);

  useEffect(() => {
    handleGetTasks();
  }, []);

  // This callback can be any function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleGetTasks(callback?: any) {
    api.getTasks()
    .then((res) => {
      setData(res.data);
      callback;
    })
    .catch((err)=> console.log(err));
  }

  function handleSortTasks(prop: string, order: number) {
    if (order === 2) {
      handleGetTasks(handleSetSortState(prop, order));
    } else {
      const sortOrder = order === 3 ? 'desc' : order === 1 ? 'asc' : '';

      api.getSortedTasks(prop, sortOrder)
      .then((res) => {
        handleSetSortState(prop, order);
        setData(res.data);
      })
      .catch((err) => console.log(err));
    }
  }

  function handleSetSortState(prop: string, order: number) {
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
  }

  function handleOpenEditPopup(card: ICard) {
    setEditPopup({isOpen: true, isCreating: false, card});
  }

  function handleOpenCreatePopup() {
    setEditPopup(({isOpen: true, isCreating: true, card: INITIAL_EDIT_POPUP_STATE}));
  }

  function handleCloseEditPopup() {
    setEditPopup((state) => ({...state, isOpen: false}));
  }

  function handleAddTask(card: ICard) {
    api.addTask(card)
    .then((res) => {
      setData((state) => ([...state, res.data]));
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
          if (el.id === res.data.id) {
            return res.data;
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
