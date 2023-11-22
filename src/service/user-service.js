import { validate } from "../validation/validation.js";
import {
  getUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";

const getUser = async (username) => {
  username = validate(getUserValidation, username);

  const findUser = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      name: true,
      role: true,
      detak_jantung: true,
      kelembapan_kulit: true,
      status: true,
      tanggal: true,
    },
  });

  if (!findUser) {
    throw new ResponseError(404, "user is not found");
  }

  return findUser;
};

const updateUser = async (req) => {
  const user = validate(updateUserValidation, req);

  const updateUser = await prismaClient.user.findUnique({
    where: {
      username: user.username,
    },
  });

  if (!updateUser) {
    throw new ResponseError(404, "user is not found");
  }

  const dataUser = {};
  // check jika ada inputan nama dan password baru maka diubah
  //   if (user.name !== undefined && user.password !== undefined) {
  //     dataUser.name = user.name;
  //     dataUser.password = await bcrypt.hash(user.password, 10);
  //   }

  if (user.name !== undefined) {
    dataUser["name"] = user.name;
  }

  if (user.password !== undefined) {
    dataUser["password"] = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: dataUser,
    select: {
      username: true,
      name: true,
    },
  });
};

const logoutUser = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return prismaClient.user.update({
    where: {
      username: username,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    },
  });
};

export default { getUser, updateUser, logoutUser };
