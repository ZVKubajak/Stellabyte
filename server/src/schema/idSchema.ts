import { z } from "zod";

const idSchema = z.string().length(24);

export default idSchema;
