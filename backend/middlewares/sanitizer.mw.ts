import type { NextFunction, Request, Response } from 'express';

export const sanitizer = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body && typeof req.body === 'object') {
    sanitizeObject(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    sanitizeObject(req.query as Record<string, string | string[]>);
  }
  next();
};

// Fonction pour nettoyer un objet si c'est un string au format key/value ou un array
const sanitizeObject = (obj: Record<string, string | string[]>) => {
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string') {
      if (key !== 'password' && key !== 'email' && key !== 'passwordConfirm') {
        obj[key] = sanitizeString(value);
      }
    } else if (Array.isArray(value)) {
      obj[key] = sanitizeArray(value);
    }
  }

  return obj;
};

// Fonction pour nettoyer une string
const sanitizeString = (str: string) => {
  if (typeof str !== 'string') return str;
  if (str !== 'password' && str !== 'email' && str !== 'passwordConfirm') {
    return str.trim().replace(/[<>"'`&]/g, '');
  }
  return str;
};

// Fonction pour nettoyer un array
const sanitizeArray = (arr: string[]) => {
  return arr.map((item) => {
    if (item !== 'password' && item !== 'email' && item !== 'passwordConfirm') {
      return sanitizeString(item);
    }
    return item;
  });
};
