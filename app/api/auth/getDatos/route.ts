import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { jwtVerify } from "jose";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mes = searchParams.get("mes");
    const anio = searchParams.get("anio");
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const email = payload.email as string;

    const fechaInicio = new Date(Number(anio), Number(mes) - 1, 1);
    const fechaFin = new Date(Number(anio), Number(mes), 0, 23, 59, 59);

    const userWithRegistros = await prisma.user.findUnique({
      where: { email },
      include: {
        registros: {
          where: {
            creadoEn: {
              gte: fechaInicio,
              lte: fechaFin,
            },
          },
          orderBy: { creadoEn: "desc" },
        },
      },
    });

    if (!userWithRegistros) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(userWithRegistros.registros, { status: 200 });
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return NextResponse.json({ error: "Error de servidor" }, { status: 500 });
  }
}
