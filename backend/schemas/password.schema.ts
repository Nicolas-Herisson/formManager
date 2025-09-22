import { z } from "zod";

export const passwordSchema = z.string()
    .min(8, {message: 'Le mot de passe doit contenir au moins 8 caracteres'})
    .max(20, {message: 'Le mot de passe doit contenir au plus 20 caracteres'})
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/,
        {
          message:
            'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractere special',
        },
    );
