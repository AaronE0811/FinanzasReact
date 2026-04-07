import { NextResponse } from "next/server";
import { registerSchema } from "@/app/validation/register";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid email or password",
        },
        {
          status: 400,
        },
      );
    }

    const existUser = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (existUser) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: result.data.email,
        password: hashedPassword,
        name: result.data.name,
      },
    });
    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error("DETALLE DEL ERROR EN SERVIDOR:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
