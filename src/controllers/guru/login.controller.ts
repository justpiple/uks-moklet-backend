import md5 from "md5";
import { findGuruByEmail } from "@/utils/queries/guru.query";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Success, Unauthorize } from "@/utils/apiResponse";

interface LoginReqProps extends Request {
  body: {
    email: string;
    password: string;
  };
}

// Fungsi login
export const Login = async (req: LoginReqProps, res: Response) => {
  try {
    const user = await findGuruByEmail(req.body.email);

    // Cek ke cocokan password yang di request dengan yg di database
    const match = user?.password == md5(req.body.password);

    //Jika password dan confirm password tidak cocok
    if (!match) {
      return res.status(400).json(Unauthorize("Email atau Password salah!"));
    }

    const id_admin = user?.id;
    const email = user?.email;
    const name = user?.name;
    const akses = user?.akses;

    // Membuat refresh token
    const token = jwt.sign(
      { id: id_admin, name, email, role: akses },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );

    // Membuat http cookie yang dikirimkan ke sisi client
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    res.json(
      Success("Login success", { data: token, id: id_admin, name, akses })
    );
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 404 });
  }
};
