import {Repository} from "./repository";
import {TODOItem} from "../models/TODOItem";
import {TODOList} from "../models/TODOList";
import {Pool} from "pg";

class PostgresRepository implements Repository{

    pool: Pool;

    constructor(){
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            password: '1234',
            database: 'stradigi',
            port: 5432
        });
    }

    async findAllLists(): Promise<TODOList[]> {
        return (await this.pool.query(`SELECT 
        L._id, L.name,
        json_agg(json_build_object('description', I.description, 'checked', I.checked, 'listId', I.listId))   
        FROM lists L  LEFT OUTER JOIN 
        items I ON L._id = I.listId
        GROUP BY L._id`)).rows;
    }
    async findListById(id: string): Promise<TODOList> {
        return (await this.pool.query('SELECT * FROM lists WHERE _id = $1',[id])).rows[0];
    }
    createList(item: TODOList) {
        this.pool.query('INSERT INTO lists (name) VALUES ($1)', [item.name]);
    }
    updateList(item: TODOList) {
        this.pool.query('UPDATE lists SET name = $1 WHERE _id = $2', [
            item.name,
            item._id
        ]);
    }
    deleteList(id: string) {
        this.pool.query('DELETE FROM lists where _id = $1', [
            id
        ]);
    }
    async findAllItems(): Promise<TODOItem[]> {
        return (await this.pool.query('SELECT * FROM items')).rows;
    }
    async findItemById(id: string): Promise<TODOItem> {
        return (await this.pool.query('SELECT * FROM items WHERE _id = $1',[id])).rows[0];
    }
    createItem(item: TODOItem) {
        this.pool.query('INSERT INTO items (description, checked, listId) VALUES ($1, $2, $3)', [item.description, item.checked, item.listId]);
    }
    updateItem(item: TODOItem) {
        this.pool.query('UPDATE items SET description = $1, checked=$2 WHERE _id = $3', [
            item.description,
            item.checked,
            item._id
         ]);
    }
    deleteItem(id: string) {
        this.pool.query('DELETE FROM items where _id = $1', [
            id
        ]);
    }

}
export const postgresRepository = new PostgresRepository();