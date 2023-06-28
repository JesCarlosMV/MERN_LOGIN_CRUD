import Express from 'express';
import mongoose from 'mongoose'; // Mongoose para conectarse a MongoDB
import morgan from 'morgan'; // Morgan para ver las peticiones al server por consola
import cookieParser from 'cookie-parser'; // CookieParser para poder usar cookies en el server y en el cliente
import router from './routes/auth.routes.js'; // router con las rutas de la app
import routerTask from './routes/task.routes.js'; // router con las rutas de las tareas

const appServer = Express(); // Servidor de Express

appServer.listen(3000, () => {
  // Servidor de Express escuchando en puerto 3000
  console.log(`====> Server running on port 3000`);
});

appServer.use(Express.json()); // para que el server entienda json en las peticiones, sino el req.body es undefined
appServer.use(Express.urlencoded({ extended: true })); // para que el server entienda los datos de los formularios x-www-form-urlencoded
appServer.use(morgan('dev'));
appServer.use(cookieParser());
appServer.use('/api', router);
appServer.use('/api', routerTask);

const conectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/express-mongo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
      console.log(
        '----> DB connected on mongodb://127.0.0.1:27017/express-mongo'
      );
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

conectDB();
