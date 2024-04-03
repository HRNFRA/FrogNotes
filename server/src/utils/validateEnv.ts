import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators"
import dotenv from "dotenv";
dotenv.config();

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    SESSION_SECRET: str(),
});