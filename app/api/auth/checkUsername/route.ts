import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username || typeof username !== "string") {
    return Response.json({ error: "Invalid username" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  return Response.json({ available: !existingUser }, { status: 200 });
}
