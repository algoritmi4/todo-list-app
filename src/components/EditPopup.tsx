import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Popup from "./Popup";
import Select, { SingleValue } from 'react-select';
import { INITIAL_INPUT_VALUES, INITIAL_SELECT_VALUES, PRIORITY_OPTIONS, STATUS_OPTIONS } from "../utils/constants";
import { IEditPopupProps } from "../utils/interfaces/EditPopupProps";
import { ISelectedItem } from "../utils/interfaces/SelectedItems.interface";
import { ISelectValues } from "../utils/interfaces/SelectValues.interface";

function EditPopup({
  editPopup,
  handleCloseEditPopup,
  handleAddTask,
  handleDeleteTask,
  handleEditTask
}: IEditPopupProps) {
  const [inputValues, setInputValues] = useState(INITIAL_INPUT_VALUES);
  const [selectValues, setSelectValues] = useState<ISelectValues>(INITIAL_SELECT_VALUES);

  const isCreateButtonActive = inputValues['title'] && inputValues['date'] && selectValues.priority && selectValues.status;

  useEffect(() => {
    if (editPopup.isOpen && editPopup.card) {
      const priority = PRIORITY_OPTIONS.find((el) => el.value === editPopup.card.priority) || null;
      const status = STATUS_OPTIONS.find((el) => el.value === editPopup.card.status) || null;

      setInputValues({'title': editPopup.card.name, 'date': editPopup.card.date});
      setSelectValues({priority, status});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editPopup.isOpen]);

  function handleInputValues(e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    const { value, name } = e.currentTarget;
    setInputValues({...inputValues, [name]: value});
  }

  function handleSelectPriority(selectedItem: SingleValue<ISelectedItem>) {
    setSelectValues((state) => ({...state, priority: selectedItem}));
  }

  function handleSelectStatus(selectedItem: SingleValue<ISelectedItem>) {
    setSelectValues((state) => ({...state, status: selectedItem}));
  }

  function handleClose() {
    handleCloseEditPopup();
  }

  function handleReset() {
    setInputValues({'title':'', 'date': ''});
    setSelectValues({priority: null, status: null});
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleReset();

    if (selectValues.priority && selectValues.status && editPopup.isCreating) {
      return handleAddTask({
        name: inputValues['title'], priority: selectValues.priority.value, date: inputValues['date'], status: selectValues.status.value
      });
    }

    if (selectValues.priority && selectValues.status && editPopup.card.id) {
      return handleEditTask(editPopup.card.id, {
        name: inputValues['title'],
        priority: selectValues.priority?.value,
        date: inputValues['date'],
        status: selectValues.status?.value
      });
    }
  }

  return (
    <Popup isOpen={editPopup.isOpen} handleClose={handleClose} children={
      <form className="bg-white flex flex-col px-12 py-8 rounded-l text-black box-border" onSubmit={handleSubmit}>
        <h2 className="m-0 font-semibold text-2xl">{editPopup.isCreating ? "Создать задачу" : "Редактировать"}</h2>
        <div className="flex justify-between">
          <p className="mt-12 font-medium">Название задачи</p>
          <p className="self-end text-sm">{`${inputValues['title'].length}/100`}</p>
        </div>
        <textarea id="priority-input" name="title" value={inputValues['title']} maxLength={100} onChange={handleInputValues} className="bg-transparent outline-none w-80 px-1.5 max-h-28 border border-gray rounded-sm mt-1 min-h-[70px] cursor-text box-border focus:border-black focus:border-2" />
        <p className="mt-5">Приоритет задачи</p>
        <Select options={PRIORITY_OPTIONS} placeholder="Выберите..." value={selectValues.priority} onChange={handleSelectPriority} className="mt-1" />
        <p className="mt-5">Нужно выполнить до</p>
        <input type="date" name="date" value={inputValues['date']} onChange={handleInputValues} className="border border-gray rounded-sm px-2 py-1.5 mt-1" />
        <p className="mt-5">Статус</p>
        <Select options={STATUS_OPTIONS} placeholder="Выберите..." value={selectValues.status} onChange={handleSelectStatus} className="mt-1" />
        <div className="flex justify-between mt-7">
          <button type="submit" className={`bg-green text-white rounded w-32 h-8 ${isCreateButtonActive ? "hover:opacity-70 duration-100" : "bg-hatch"} ${editPopup.isCreating ? "w-full" : ""}`} disabled={!isCreateButtonActive}>{editPopup.isCreating ? "Создать" : "Готово"}</button>
          <button type="button" className={`bg-red text-white rounded w-32 h-8 hover:opacity-70 duration-100 ${editPopup.isCreating ? "hidden" : ""}`} onClick={() => editPopup.card.id ? handleDeleteTask(editPopup.card.id) : null}>Удалить</button>
        </div>
      </form>
    }/>
  )
}

export default EditPopup;