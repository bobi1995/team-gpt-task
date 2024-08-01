"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const NotificationType = z.enum([
  "platform-update",
  "comment-tag",
  "access-granted",
  "join-workspace",
]);

const Notification = z.object({
  type: NotificationType,
  release: z.string().nullable(),
  name: z.string().nullable(),
  date: z.date(),
  read: z.boolean(),
});

export const createNotification = async (notification: {
  type: string;
  release?: string | null;
  name?: string | null;
}) => {
  try {
    const fields = Notification.safeParse({
      type: notification.type,
      release: notification.release || null,
      name: notification.name || null,
      date: new Date(),
      read: false,
    });
    if (!fields.success) {
      throw new Error("Missing or invalid fields");
    }

    const { type, release, name } = fields.data;

    await sql`
    INSERT INTO Notifications (type, release, name, date, read)
    VALUES (${type}, ${release}, ${name},  NOW(), FALSE)
  `;
    revalidatePath("/");
    switch (type) {
      case "comment-tag":
        return revalidatePath("/comments");
      case "join-workspace":
        return revalidatePath("/workspace");
      case "access-granted":
        return revalidatePath("/chats");
      default:
        return;
    }
  } catch (error) {
    throw new Error("Failed to create notification");
  }
};

//Прочита всички алерти от даден тип. НЕ СЕ използва за update алерта
export const readByType = async (type: string) => {
  try {
    await sql`UPDATE Notifications
    SET read = TRUE
    WHERE type = ${type};`;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to read notification");
  }
};

//Samo za platfrom-update
export const readPlatformNotification = async (id: string) => {
  try {
    await sql`UPDATE Notifications
    SET read = TRUE
    WHERE id = ${id};`;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to read platform notification");
  }
};
