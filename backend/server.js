import  express from "express"
import cors from "cors"
import shoes from "./api/profiles.route.js"



const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/credit_profile", shoes) 
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))



export default app
