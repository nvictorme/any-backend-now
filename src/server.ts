import express, {Request, Response, NextFunction} from "express"
import cors from "cors"

const app = express()

const corsHandler = cors({origin: true})
app.use(corsHandler)

app.get("/", (req: Request, res: Response, nex: NextFunction) => {
    res.status(200).json({message: "This is any backend now!"})
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Listening on port", PORT)
})
