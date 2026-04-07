import { NextResponse } from "next/server";
import { DatosSchema } from "@/app/validation/datosForm";
import prisma from "@/app/lib/prisma";
import { jwtVerify } from "jose";

export async function POST(request: Request) {
  const body = await request.json();
  const result = DatosSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Error en los datos ingresados",
      },
      {
        status: 400,
      },
    );
  }

  try {
    {
      /*extraer token del header*/
    }
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        {
          error: "Token not found",
        },
        {
          status: 400,
        },
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const email = payload.email;

    const existUser = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (!existUser) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 400,
        },
      );
    }

    const newDato = await prisma.registro.create({
      data: {
        monto: result.data.monto,
        tipo: result.data.tipo,
        categoria: result.data.categoria,
        descripcion: result.data.descripcion,
        userId: existUser.id,
      },
    });
    return NextResponse.json(
      {
        ok: true,
        message: "Datos guardados correctamente",
        data: newDato,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error al guardar los datos",
      },
      {
        status: 500,
      },
    );
  }
}
