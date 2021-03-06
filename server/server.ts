import express from "express";
import cors from "cors";
import helmet from "helmet";
import db from "./shared/infra/database/models";
import router from "./shared/infra/routes";

const PORT = process.env.PORT || 3001;
const app: express.Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use(router);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT} 🚀`);
  });
});

export default app;
