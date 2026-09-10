import { config } from './config/config.js';
import express from 'express';

const app = express();

if (config.core.debug) {
    console.log("Mode debug activé !");
} else {
    console.log("Mode débug non pas là");
}

app.listen(config.core.port, () => { 
    console.log("App lancé");
});