import {Router, Request, Response, NextFunction} from 'express';
import {Repository} from '../repositories/repository';
import {TODOList} from '../models/TODOList';

export function TodoListRouter(repository: Repository): Router {
	const router = Router();

    router.get('/', async(req: Request, res: Response, next:NextFunction) => {
        repository.findAllLists().then((list: Array<TODOList>) => {
            return res.json(list);
        })
    });
    
    router.get('/:id', async(req:Request, res:Response, next:NextFunction) => {
        repository.findListById(req.params.id).then((list:TODOList)=> {
            if(list)
                return res.json(list);
            else res.sendStatus(404);
        })
    });
    
    
    router.post("/", async(req: Request<{},{},TODOList>, res: Response, next:NextFunction) => {
        try{
            repository.createList(req.body);
            res.sendStatus(200);
    
        }catch(error){
            res.send(`Erorr ${error}`);
        }
    });
    
    
    router.put('/', async(req: Request<{},{},TODOList>, res: Response, next:NextFunction) => {
       try{
        repository.updateList(req.body);
        res.sendStatus(200);
    
       }catch(error){
            console.log(error);
            return res.status(500).json(`Internal Server error: ${error}`);
       }
    });
    
    router.delete('/:id', async(req: Request, res: Response, next:NextFunction) => {
        try{
            repository.deleteList(req.params.id);
            res.sendStatus(200);
        }catch(error){
            res.send(`Erorr ${error}`);
            next(error)
        }
    });

    return router;
    
}
