import jwt from "jsonwebtoken";

import connection from "../database.js";

import * as finantialService from '../services/finantialService.js';
import * as userService from '../services/userService.js';

export async function newEntry(req, res) {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split('Bearer ')[1];
  
        if (!token) {
            return res.sendStatus(401);
        }
  

        const user = await userService.authenticate(token);

        if (user === null) {
            return res.sendStatus(401);
        }
        //...
        const { value, type } = req.body;
    
        if (!value || !type) {
            return res.sendStatus(400);
        }
    
        if (!['INCOME', 'OUTCOME'].includes(type)) {
            return res.sendStatus(400);
        }
    
        if (value < 0) {
            return res.sendStatus(400);
        }
    
        await connection.query(
            `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
            [user.id, value, type]
        );
  
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}