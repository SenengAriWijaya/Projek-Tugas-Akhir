import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");
  //   console.log(token);
  if (!token) {
    res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  } else {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });
    console.log(user);
    if (!user) {
      res
        .status(401)
        .json({
          errors: "Unauthorized",
        })
        .end();
    } else {
      req.user = user;
      next();
    }
  }
};

export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role === requiredRole) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
  };
};
