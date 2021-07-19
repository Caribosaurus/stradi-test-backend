import express from 'express';
import {TodoListRouter} from './routes/TodoListsRouter';
import {TodoItemRouter} from './routes/TodoItemRouter';
import {mongoRepository} from './repositories/MongoRepository';
import {postgresRepository} from './repositories/PostgresRepository';
import {Repository} from './repositories/repository';


class Applicaction {

    app: express.Application;
    repository: Repository;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', 4000);
        this.repository = postgresRepository;
    }

    middlewares() {
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/list', TodoListRouter(this.repository));
        this.app.use('/item', TodoItemRouter(this.repository));
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is running at port : ', this.app.get('port'));
        });
    }
}

export default Applicaction;