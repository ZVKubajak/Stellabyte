import cors from "cors";
import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "../client/dist")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "..client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}.`);
});
