import {TODOItem} from "../models/TODOItem";
import {TODOList} from "../models/TODOList";

export interface Repository{
    findAllLists(): Promise<Array<TODOList>>;
    findListById(id: string): Promise<TODOList>;
    createList(item: TODOList);
    updateList(item: TODOList);
    deleteList(id: string);
    findAllItems(): Promise<Array<TODOItem>>;
    findItemById(id: string): Promise<TODOItem>;
    createItem(item: TODOItem);
    updateItem(item: TODOItem);
    deleteItem(id: string);
}