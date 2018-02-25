import { News } from "./news";

export interface IServerResponse {
    items: News[];
    total: number;
}