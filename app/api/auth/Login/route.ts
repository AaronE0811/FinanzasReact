import { NextResponse } from "next/server";
import { loginSchema } from "@/app/validation/login";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(request: Request) {
  const body = await request.json();
  const result = loginSchema.safeParse(body);

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

  const isMatch = await bcrypt.compare(
    result.data.password,
    existUser.password,
  );

  if (!isMatch) {
    return NextResponse.json(
      {
        error: "Invalid email or password",
      },
      {
        status: 400,
      },
    );
  }

  const token = await new SignJWT({
    email: existUser.email,
    name: existUser.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return NextResponse.json({ token });
}
