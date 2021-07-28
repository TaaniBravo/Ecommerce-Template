import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());

export default app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT} 🚀`);
});
