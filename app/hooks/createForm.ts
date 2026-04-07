import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatosSchema, DatosForm } from "../validation/datosForm";
import { FormDatos } from "../services/authServicesForm";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
function CreateForm(onSuccess: () => void) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DatosForm>({
    resolver: zodResolver(DatosSchema),
  });
  // Dentro de hooks/createForm.ts
  const tipoActual = watch("tipo");

  useEffect(() => {
    if (tipoActual === "Ingreso") {
      // Forzamos que la categoría sea "Ingreso" si el tipo es Ingreso
      setValue("categoria", "Ingreso");
    } else {
      // Si vuelve a Gasto, podemos poner uno por defecto
      setValue("categoria", "Alimentacion");
    }
  }, [tipoActual, setValue]);
  const onSubmit = async (data: DatosForm) => {
    try {
      Swal.fire({ title: "Loading...", didOpen: () => Swal.showLoading() });
      const result = await FormDatos(
        data.monto,
        data.tipo,
        data.categoria,
        data.descripcion,
      );

      if (result.ok) {
        await Swal.fire({
          icon: "success",
          title: "Datos enviados correctamente",
          text: "Tus datos han sido enviados correctamente.",
        });
        reset();
        onSuccess();
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error al enviar los datos",
          text: "Tus datos no han sido enviados correctamente.",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to submit form.",
        icon: "error",
      });
    }
  };

  return { register, handleSubmit, errors, onSubmit, watch };
}
export default CreateForm;
