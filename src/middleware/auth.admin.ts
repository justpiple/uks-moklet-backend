import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to verify JWT and check if the user has admin role
export const isAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token; // Assuming you store the token in a cookie

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  try {
    // Verify the JWT
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user has the admin role
    if (decodedToken.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden: Not an admin" });
    }

    // Add the decoded token to the request for later use if needed
    // req.decodedToken = decodedToken;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
