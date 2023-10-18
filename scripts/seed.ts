const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Ciencia da Computacao" },
        { name: "Musica" },
        { name: "Fitness" },
        { name: "Fotografia" },
        { name: "Contabilidade" },
        { name: "Engenharia" },
        { name: "Filmagen" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
