import {Repository} from "./repository";
import {TODOList} from "../models/TODOList";
import {MongoClient,  Db, ObjectId, Collection} from 'mongodb';
import {TODOItem} from "../models/TODOItem";

class MongoRepository implements Repository{

    url:string = "mongodb://localhost:27017";
    DefaultDB = "todoApp";
    client: MongoClient 
    db:Db;
    listCollection: Collection<any>;
    itemCollection: Collection<any>;

    constructor(){
        this.client = new MongoClient(this.url);
        this.client.connect().then(conn => {
            const db  = conn.db(this.DefaultDB)
            this.listCollection = db.collection('lists');
            this.itemCollection = db.collection('items');
        });

    }
    findAllItems(): Promise<TODOItem[]> {
        return this.itemCollection.find().toArray();
    }
    findItemById(id: string): Promise<TODOItem> {
        return this.itemCollection.findOne({_id: new ObjectId(id)});
    }
    createItem(item: TODOItem) {
        const itemDocument:any = {...item};
        itemDocument.listId = new ObjectId(item.listId);
        this.itemCollection.insertOne(itemDocument);
    }
    updateItem(item: TODOItem) {
        this.itemCollection.updateOne(
            { _id: new ObjectId(item._id) },
            {$set: {   
                description: item.description,
                checked: item.checked
            }}).then((doc) => console.log(doc));
    }
    deleteItem(id: string) {
        this.itemCollection.deleteOne({_id: new ObjectId(id)});
    }

    async findAllLists(): Promise<Array<TODOList>> {

        return  this.listCollection.aggregate([
                {
                    $project: {
                    _id: {
                        $toString: "$_id"
                    }
                    }
                },
                { $lookup:
                    {
                      from: 'items',
                      localField: '_id',
                      foreignField: 'listID',
                      as: 'items'
                    }
                  }
            ]).toArray()

    }
    findListById(id: string): Promise<TODOList> {
        return this.listCollection.findOne({_id: new ObjectId(id)});
    }
    createList(item: TODOList) {
        this.listCollection.insertOne(item);
    }
    updateList(item: TODOList) {
        this.listCollection.updateOne(
            { _id: new ObjectId(item._id) },
            {$set: {   
                name: item.name,
            }}).then((doc) => console.log(doc));
    }
    deleteList(id: string) {
        this.listCollection.deleteOne({_id: new ObjectId(id)});
    }

}

export let mongoRepository = new MongoRepository();