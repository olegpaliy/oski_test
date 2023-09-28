import dotenv from "dotenv";
dotenv.config();

import { createServer } from "./createServer";
import { connect } from "./sequelize/db";

connect();

const app = createServer();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
