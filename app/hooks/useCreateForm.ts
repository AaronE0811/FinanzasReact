import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, registerSchema } from "../validation/register";
import { Register } from "../services/AuthServices";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function useCreateForm() {
  const redirect = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterSchema) => {
    try {
      Swal.fire({ title: "Saving...", didOpen: () => Swal.showLoading() });
      const result = await Register(data.email, data.password, data.name);

      if (result.ok) {
        await Swal.fire({
          icon: "success",
          title: "User created successfully",
          text: "User created successfully",
        });
        reset();
        redirect.push("/login");
      } else if (result.error === "User already exists") {
        Swal.fire({
          icon: "error",
          title: "User already exists",
          text: "Error en el envío",
        });
      } else {
        console.error("Error en el envío", result);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error en el envío",
        });
      }
    } catch (error) {
      console.error("Error en el envío en useLoginForm", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error en el envío",
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}

export default useCreateForm;
