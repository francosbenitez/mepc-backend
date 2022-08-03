export const sendErrorResponse = (
  res: any,
  code: any,
  errorMessage: any,
  e: any = null
) =>
  res.status(code).send({
    status: "error",
    error: errorMessage,
    e: e?.toString(),
  });

export const sendSuccessResponse = (
  res: any,
  code: any,
  data: any,
  message = "Successful"
) =>
  res.status(code).send({
    status: "success",
    data,
    message,
  });
