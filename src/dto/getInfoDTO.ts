import z from "zod";

export type GetInfoDTOInput = string

export const GetInfoSchema = z.string(z.string({invalid_type_error: "The search param used must be a string"})).transform(data => data as GetInfoDTOInput)

