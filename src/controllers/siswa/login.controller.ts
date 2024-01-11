import md5 from "md5";
import { findSiswaByEmail } from "@/utils/queries/siswa.query";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface LoginReqProps extends Request {
  body: {
    email: string;
    password: string;
  };
}

// Fungsi login
export const Login = async (req: LoginReqProps, res: Response) => {
  try {
    const user = await findSiswaByEmail(req.body.email);

    // Cek ke cocokan password yang di request dengan yg di database
    const match = user?.password == md5(req.body.password);

    //Jika password dan confirm password tidak cocok
    if (!match) {
      return res.status(400).json({ msg: "Email atau Password Salah!" });
    }

    const id_siswa = user?.id;
    const email = user?.email;
    const name = user?.email;

    // Membuat refresh token
    const token = jwt.sign(
      { id: id_siswa, name, email, role: "SISWA" },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );

    // Membuat http cookie yang dikirimkan ke sisi client
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000, //expired dalam 1 hari
    });
    res.json({ status: 200, token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 404 });
  }
};
