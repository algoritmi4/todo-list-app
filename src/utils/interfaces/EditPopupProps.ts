import { ICard } from "./Card.interface";
import IEditPopupOptions from "./EditPopupOptions.interface";

export interface IEditPopupProps {
  editPopup: IEditPopupOptions,
  handleCloseEditPopup: () => void,
  handleAddTask: (arg: ICard) => void;
  handleDeleteTask: (arg: number) => void;
  handleEditTask: (id:number, card: ICard) => void;
}