import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "../validation/login";
import { Login } from "../services/AuthServices";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function useLoginForm() {
  const redirect = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      Swal.fire({ title: "Loading...", didOpen: () => Swal.showLoading() });
      const result = await Login(data.email, data.password);

      if (result.ok) {
        await Swal.fire({
          icon: "success",
          title: "Login successfully",
          text: "Login successfully",
        });
        reset();
        redirect.push("/home");
      } else if (result.error === "User not found") {
        await Swal.fire({
          icon: "error",
          title: "User not found",
          text: "Error en el envío",
        });
      } else if (result.error === "Invalid email or password") {
        await Swal.fire({
          icon: "error",
          title: "Invalid email or password",
          text: "Error en el envío",
        });
      }
    } catch (error) {
      console.error("Error en el envío en useLoginForm", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error en el envío",
      });
    }
  };

  return { register, handleSubmit, reset, errors, onSubmit };
}

export default useLoginForm;
