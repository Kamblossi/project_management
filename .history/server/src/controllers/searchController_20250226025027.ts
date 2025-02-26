import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;
  console.log("Search Query:", query); // Debugging
  
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [{ username: { contains: query as string } }],
      },
    });

    console.log("Search Results:", { tasks, projects, users }); // Debugging

    res.json({ tasks, projects, users });
  } catch (error: any) {
    console.error("Error performing search:", error); // Log error to backend
    res.status(500).json({ message: `Error performing search: ${error.message}` });
  }
};
