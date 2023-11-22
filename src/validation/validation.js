import { ResponseError } from "../error/response-error.js";

const validate = (schema, request) => {
  const result = schema.validate(request, {
    // membuat semua validasinya keluar
    abortEarly: false, // return all errors

    // untuk menghindari menambah field yg tidak-tidak
    allowUnknown: false,
  });
  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
};

export { validate };
