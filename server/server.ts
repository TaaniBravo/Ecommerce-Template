import express from "express";
import cors from "cors";
import helmet from "helmet";
import db from "./shared/infra/database/models";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());

export default db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT} 🚀`);
  });
});
