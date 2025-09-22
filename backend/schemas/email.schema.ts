import { z } from "zod";

export const emailSchema = z
.email({ message: 'Email invalide' })
.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
  message: 'Email invalide, caracteres speciaux non autorises',
})