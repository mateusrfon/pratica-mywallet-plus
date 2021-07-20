import * as userRepository from '../repositories/userRepository.js';
import * as userService from '../services/userService.js';

export async function signUp(req, res) {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.sendStatus(400);
      }
  
      const user = await userRepository.findByEmail(email);
  
      if (user) {
        return res.sendStatus(409);
      }
  
      await userService.create(name, email, password);
  
      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
};

export async function signIn(req, res) {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.sendStatus(400);
      }
  
      const authentication = await userService.authenticateSignIn(email, password);
  
      if (authentication === null) {
        return res.sendStatus(401);
      }

      res.send(authentication);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
}