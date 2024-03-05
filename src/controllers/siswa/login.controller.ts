import md5 from "md5";
import { findSiswaByEmail } from "@/utils/queries/siswa.query";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { InternalServerError, Success, Unauthorize } from "@/utils/apiResponse";

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
      return res.status(401).json(Unauthorize("Email atau Password salah!"));
    }

    const id_siswa = user?.id;
    const email = user?.email;
    const name = user?.name;

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
      maxAge: 15 * 24 * 60 * 60 * 1000, //expired dalam 15 hari
      secure: true,
      sameSite: "none",
    });
    res.json(
      Success("Login success", {
        data: {
          token,
          id: id_siswa,
          name,
          akses: "SISWA",
        },
      })
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(InternalServerError("Email atau Password salah!"));
  }
};
