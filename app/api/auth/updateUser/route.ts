import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const { email, username, name, image } = await request.json();

    if (!email || typeof email !== "string") {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!username || !name || !image) {
      return Response.json(
        { error: "Username, name, and image are required" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { username, name, image, isNewUser: false },
      select: { username: true, name: true, image: true, isNewUser: true },
    });

    return Response.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update user" }, { status: 500 });
  }
}
