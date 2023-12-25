import { IEditPopupCard } from "./EditPopupCard.interface";

export default interface IEditPopupOptions {
  isOpen: boolean;
  isCreating: boolean;
  card: IEditPopupCard;
}