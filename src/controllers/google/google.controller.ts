import { Success, Unauthorize } from "@/utils/apiResponse";
import { findGuruByEmail } from "@/utils/queries/guru.query";
import { findSiswaByEmail } from "@/utils/queries/siswa.query";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const BASE_URL = process.env.BASE_URL;

export const Auth = (req: Request, res: Response) => {
  const redirect = `https://accounts.google.com/o/oauth2/v2/auth?prompt=select_account%20consent&response_type=code&client_id=${CLIENT_ID}&scope=openid%20email%20profile&redirect_uri=${BASE_URL}/google/callback`;
  res.redirect(302, redirect);
};

export const callback = async (req: Request, res: Response) => {
  try {
    const exchange_token = `code=${req.query.code}&client_id=${CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${BASE_URL}/google/callback&grant_type=authorization_code`;
    const token_req = (await fetch(`https://oauth2.googleapis.com/token`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body: exchange_token,
    }).then((res) => res.json())) as Record<any, any>;
    const token = token_req.access_token;

    const openid_url = `https://openidconnect.googleapis.com/v1/userinfo?access_token=${token}`;
    const userdata = (await fetch(openid_url).then((res) =>
      res.json()
    )) as Record<any, any>;

    let user = (await findGuruByEmail(userdata.email)) as any;

    if (!user) {
      user = await findSiswaByEmail(userdata.email);
    }

    if (!user) {
      return res.redirect("/");
    }

    const id_admin = user?.id;
    const email = user?.email;
    const name = user?.name;
    const akses = user?.akses || "SISWA";

    // Membuat refresh token
    const jwtToken = jwt.sign(
      { id: id_admin, name, email, role: akses },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );

    // Membuat http cookie yang dikirimkan ke sisi client
    res.cookie("token", jwtToken, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    res.json(
      Success("Login success", {
        data: {
          token: jwtToken,
          id: id_admin,
          name,
          akses,
        },
      })
    );
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 404 });
  }
};
