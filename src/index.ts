// app.ts
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Route to create a new siswa
app.post("/siswa", async (req, res) => {
  try {
    const { email, name, gender, password, register, rombel } = req.body;

    const createdSiswa = await prisma.siswa.create({
      data: {
        email,
        name,
        gender,
        password,
      },
    });

    res.json(createdSiswa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
