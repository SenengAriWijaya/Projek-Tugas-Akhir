import { validate } from "../validation/validation.js";
import {
  registerValidation,
  getValidation,
  updateValidation,
  updateDataUserValidation,
} from "../validation/admin-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";

const register = async (req) => {
  const user = validate(registerValidation, req);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "username already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
      role: true,
    },
  });
};

const getData = async (username) => {
  username = validate(getValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return user;
};

const update = async (req) => {
  const user = validate(updateValidation, req);

  const dataUser = await prismaClient.user.findUnique({
    where: {
      username: user.username,
    },
  });

  if (!dataUser) {
    throw new ResponseError(404, "user is not found");
  }

  const data = {};
  if (user.name) {
    data.name = user.name;
  }
  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }
  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: data,
    select: {
      username: true,
      name: true,
    },
  });
};

const logout = async (username) => {
  username = validate(getValidation, username);

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

const list = async () => {
  const user = await prismaClient.user.findMany({
    select: {
      name: true,
      role: true,
      detak_jantung: true,
      kelembapan_kulit: true,
      status: true,
      tanggal: true,
    },
  });
  return user;
};

const updateUser = async (req) => {
  const dataUser = validate(updateDataUserValidation, req);

  const findUser = await prismaClient.user.findUnique({
    where: {
      id: dataUser.id,
    },
  });

  if (!findUser) {
    throw new ResponseError(404, "user is not found");
  }

  const user = await prismaClient.user.update({
    where: {
      id: dataUser.id,
    },
    data: {
      ...dataUser,
    },
    // select: {
    //   detak_jantung: true,
    //   kelembaban_kulit: true,
    //   status: true,
    //   tanggal: true,
    // },
  });
  return user;
};

const monitoringSensor = async () => {
  const dataSensor = await prismaClient.save.findFirst({
    orderBy: {
      tanggal: "desc",
    },
  });
  return dataSensor;
};

export default {
  register,
  getData,
  update,
  logout,
  list,
  updateUser,
  monitoringSensor,
};
