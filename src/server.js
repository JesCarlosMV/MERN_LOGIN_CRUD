import Express from 'express'; // Servidor de Express

const appServer = Express();
appServer.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

appServer.use(Express.json()); // para que el server entienda json en las peticiones, sino el req.body es undefined

import mongoose from 'mongoose'; // Mongoose para conectarse a MongoDB

const conectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/express-mongo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
      console.log('DB connected');
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

conectDB();

import morgan from 'morgan'; // Morgan para ver las peticiones al server por consola

appServer.use(morgan('dev'));

import { router } from './routes/auth.routes.js'; // importamos el router con las rutas de la app y la usamos en el server

appServer.use('/api/', router);
