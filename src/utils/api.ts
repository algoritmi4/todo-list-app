import axios from "axios";
import { ICard } from "./interfaces/Card.interface";
import { API_BASE_URL } from "./constants";

const apiOptions = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});
class Api {
  getTasks() {
    return apiOptions.get('');
  }

  getSortedTasks(prop: string, order: string) {
    return apiOptions.get<ICard[]>('', {
      params: {
        _sort: prop,
        _order: order
      }
    })
  }

  addTask(card: ICard) {
    return apiOptions.post<ICard>('', card);
  }

  deleteTask(id: number) {
    return apiOptions.delete(`${id}`);
  }

  editTask(id: number, card: ICard) {
    return apiOptions.patch<ICard>(`${id}`, card);
  }
}

export const api = new Api();