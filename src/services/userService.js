import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as userRepository from '../repositories/userRepository.js';

export async function create(name, email, password) {
    const hashedPassword = bcrypt.hashSync(password, 12);
  
    userRepository.create(name, email, hashedPassword);
};

export async function authenticateSignIn(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return null;
    }

    const token = jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET);
    
    return { token };
}

export async function authenticate(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
}