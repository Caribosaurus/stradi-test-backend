import {TODOItem} from "./TODOItem";

export interface TODOList {
    _id?: string;
    name: string;
    items?: Array<TODOItem>
}