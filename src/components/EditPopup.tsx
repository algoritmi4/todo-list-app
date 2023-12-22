import { ChangeEvent, FormEvent, useState } from "react";
import Popup from "./Popup";
import Select, { SingleValue } from 'react-select';
import { ICard } from "../utils/interfaces/Card.interface";

interface SelectedItem {
  value: string;
  label: string;
}

interface SelectValues {
  priority: SelectedItem | null;
  status: SelectedItem | null;
}

function EditPopup({
  isOpen,
  handleClose,
  handleAddTask
}: {
  isOpen: boolean,
  handleClose: () => void,
  handleAddTask: (arg: ICard) => void;
}) {
  const [inputValues, setInputValues] = useState({'title':'', 'date': ''});
  const [selectValues, setSelectValues] = useState<SelectValues>({priority: null, status: null});

  function handleInputValues(e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    const { value, name } = e.currentTarget;
    setInputValues({...inputValues, [name]: value});
  }

  function handleSelectPriority(selectedItem: SingleValue<SelectedItem>) {
    setSelectValues((state) => ({...state, priority: selectedItem}));
  }

  function handleSelectStatus(selectedItem: SingleValue<SelectedItem>) {
    setSelectValues((state) => ({...state, status: selectedItem}));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleClose();

    if (selectValues.priority && selectValues.status) {
      const date = new Date(inputValues['date']);
      const formatedDate = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
      handleAddTask({name: inputValues['title'], priority: selectValues.priority.label, date: formatedDate, status: selectValues.status.label});
    }
  }

  const priorityOptions = [
    {value: 'high', label: 'Высокий'},
    {value: 'mid', label: 'Средний'},
    {value: 'low', label: 'Низкий'}
  ]

  const statusOptions = [
    {value: 'ready', label: 'Выполнено'},
    {value: 'process', label: 'В процессе'},
    {value: 'need start', label: 'Нужно начать'},
  ]

  return (
    <Popup isOpen={isOpen} handleClose={handleClose} children={
      <form className="bg-white flex flex-col px-12 py-8 rounded-l text-black box-border" onSubmit={handleSubmit}>
        <h2 className="m-0 font-semibold text-2xl">Создать задачу</h2>
        <div className="flex justify-between">
          <p className="mt-12 font-medium">Название задачи</p>
          <p className="self-end text-sm">{`${inputValues['title'].length}/100`}</p>
        </div>
        <label htmlFor="priority-input" className="border-2 rounded-sm mt-1 ml-auto px-1.5 w-80 min-h-[52px] cursor-text box-border">
          <textarea id="priority-input" name="title" value={inputValues['title']} maxLength={100} onChange={handleInputValues} className="bg-transparent outline-none py-0.5 w-full h-full max-h-20" />
        </label>
        <p className="mt-5">Приоритет задачи</p>
        <Select options={priorityOptions} placeholder="Выберите..." value={selectValues.priority} onChange={handleSelectPriority} className="mt-1" />
        <p className="mt-5">Нужно выполнить до</p>
        <input type="date" name="date" value={inputValues['date']} onChange={handleInputValues} className="border border-grey rounded-sm px-2 py-1.5 mt-1" />
        <p className="mt-5">Статус</p>
        <Select options={statusOptions} placeholder="Выберите..." value={selectValues.status} onChange={handleSelectStatus} className="mt-1" />
        <div className="flex justify-between mt-7">
          <button type="submit" className="bg-green text-white rounded w-32 h-8 hover:opacity-70 duration-100">Создать</button>
          <button type="button" className="bg-red text-white rounded w-32 h-8 hover:opacity-70 duration-100" disabled>Удалить</button>
        </div>
      </form>
    }/>
  )
}

export default EditPopup;