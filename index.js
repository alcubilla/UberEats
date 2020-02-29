import http from  'http';
import express from  'express'; 
import dotenv from 'dotenv'; //usar el .env
import bodyParse from 'body-parser';
import routes from  './routes';
import Data from './Data';
import Zonas from './Zonas'


var SelectPlatillos = [];
var Total = 0;

const APP = express();

APP.use (bodyParse.urlencoded());
APP.use(bodyParse.json());

dotenv.config();

const SERVER = http.createServer(APP);

routes(APP,Data,Zonas, SelectPlatillos, Total);

SERVER.listen (process.env.PORT);