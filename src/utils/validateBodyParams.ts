import { Request, Response } from "express";

type Param = {
  paramName: string;
  paramType: "string" | "number" | "boolean";
  optional?: boolean;
};

function validateBodyParams(
  req: Request<any>,
  res: Response<any>,
  params: Param[]
) {
  const body = req.body;
  if (!body) {
    throw new Error("No body found in request");
  }

  const validatedParams: any = {};

  params.forEach((param) => {
    const { paramName, paramType } = param;

    if (body[paramName] === undefined && !param.optional) {
      throw new Error(`Missing param: ${paramName}`);
    }

    if (paramType !== typeof body[paramName] && !param.optional) {
      throw new Error(`Param ${paramName} is not of type ${paramType}`);
    }

    validatedParams[paramName] = body[paramName];
  });

  return validatedParams;
}

export default validateBodyParams;
