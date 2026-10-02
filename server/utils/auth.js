import bcrpty from "bcrypt";
import e from "express";

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrpty.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrpty.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const comparePassword = (password, hashed) => {
  return bcrpty.compare(password, hashed);
};
