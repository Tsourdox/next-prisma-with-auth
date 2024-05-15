import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const mysan = await db.user.upsert({
    where: { email: "mysan@mail.se" },
    update: {},
    create: {
      email: "mysan@mail.se",
      name: "Mysan",
      posts: {
        create: [
          {
            title: "Mjau",
            content: "This is my first post",
            published: true,
          },
          {
            title: "Mjaaaaauuuu",
            content: "This is a second post",
          },
        ],
      },
    },
  });

  console.log({ mysan });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
