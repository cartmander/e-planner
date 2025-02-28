import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/userRoute";

const app: Application = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) : void => {
    res.send("Hello from Homepage.");
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
