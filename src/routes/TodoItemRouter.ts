import {Router, Request, Response, NextFunction} from 'express';
import {Repository} from '../repositories/repository';
import {TODOItem} from '../models/TODOItem';

export function TodoItemRouter(repository: Repository): Router {
	const router = Router();

    router.get('/', async(req: Request, res: Response, next:NextFunction) => {
        repository.findAllItems().then((items: Array<TODOItem>) => {
            return res.json(items);
        })
    });
    
    router.get('/:id', async(req:Request, res:Response, next:NextFunction) => {
        repository.findItemById(req.params.id).then((item:TODOItem)=> {
        if(item)
            return res.json(item);
        else 
            res.sendStatus(404);
        })
    });
    
    
    router.post("/", async(req: Request<{},{},TODOItem>, res: Response, next:NextFunction) => {
        try{
            repository.createItem(req.body);
            res.sendStatus(200);
    
        }catch(error){
            res.send(`Erorr ${error}`);
        }
    });
    
    
    router.put('/', async(req: Request<{},{},TODOItem>, res: Response, next:NextFunction) => {
       try{
        repository.updateItem(req.body);
        res.sendStatus(200);
    
       }catch(error){
            console.log(error);
            return res.status(500).json(`Internal Server error: ${error}`);
       }
    });
    
    router.delete('/:id', async(req: Request, res: Response, next:NextFunction) => {
        try{
            repository.deleteItem(req.params.id);
            res.sendStatus(200);
        }catch(error){
            res.send(`Erorr ${error}`);
            next(error)
        }
    });

    return router;
    
}
