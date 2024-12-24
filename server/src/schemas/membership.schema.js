import { z } from "zod";

const membershipSchema = z.object({
  name: z
    .string({ required_error: "Nombre es obligatorio" })
    .min(2, { message: "Nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "Nombre no puede tener más de 50 caracteres" }),
  dni: z
    .string({ required_error: "DNI es obligatorio" })
    .min(8, { message: "DNI debe tener 8 dígitos" })
    .max(8, { message: "DNI debe tener 8 dígitos" })
    .regex(/^\d{8}$/, { message: "DNI debe tener solo números" }),
  phone: z
    .string({ required_error: "Número de teléfono es obligatorio" })
    .min(9, { message: "Número de teléfono debe tener 9 dígitos" })
    .max(9, { message: "Número de teléfono debe tener 9 dígitos" })
    .regex(/^9\d{8}$/, { message: "Número de teléfono debe empezar con 9" }),
  payment: z
    .number({ required_error: "Monto de pago es obligatorio" })
    .positive({ message: "Monto de pago debe ser un número positivo" }),
  startDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({ required_error: "Fecha de inicio es obligatoria" })
  ),
  endDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({ required_error: "Fecha de fin es obligatoria" })
  ),
});

export default membershipSchema;
