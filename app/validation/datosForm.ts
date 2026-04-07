import { z } from "zod";

export const DatosSchema = z.object({
  monto: z.number().positive({ message: "Monto debera ser mayor a 0" }),
  tipo: z.string().min(1, { message: "Seleccione un tipo" }),
  categoria: z.string().min(1, { message: "Seleccione una categoria" }),
  descripcion: z.string().max(255, {
    message: "La descripcion no puede tener mas de 255 caracteres",
  }),
});

export type DatosForm = z.infer<typeof DatosSchema>;
