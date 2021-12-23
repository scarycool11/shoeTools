import  Express from "express"
import cors from "cors"
import shoes from "./api/shoes.route.js"



const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/resteraunts", shoes)
app.use("*", (req, res)) => res.status(404).json({error: "not found"}) //Bug Fix

export default app