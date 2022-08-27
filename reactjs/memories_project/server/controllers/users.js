import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signin = async (req, res) => {
  const {email, password} = req.body;

  try {
    const existingUser = await User.findOne({email});

    if(!existingUser) return res.status(404).json({message: 'User doesnt exist'})

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if(!isPasswordCorrect) return res.status(404).json({message: "Invalid Credendials"})

    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'secret', {expiresIn: "1h"})

    res.status(200).json({result: existingUser, token})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Someting went wrong"})
  }
}

export const signup = async (req, res) => {
  const {email, password, confirmPassword, firstName, lastName} = req.body;
  try {
    const existingUser = await User.findOne({email});
    
    if(existingUser) {return res.status(404).json({message: 'User already exist'})}

    if(password !== confirmPassword){
      return res.status(404).json({message: 'Password dont match'})
    }

    const hashedPass = await bcrypt.hash(password, 12)

    const result = await User.create({email, password: hashedPass, name: `${firstName} ${lastName}`})
    
    const token = jwt.sign({email: result.email, id: result._id}, 'secret', {expiresIn: "1h"})
    
    res.status(200).json({result, token})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Someting went wrong"})
  }

}