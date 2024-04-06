import { Router } from "express";
import Bron from "../models/bron.js";
const router = Router();

router.get ("/", (_, res) =>{
    res.render("bron")
})

router.post("/", async (req, res) => {
	const { name } = req.body;

	if (!name) {
		return res.status(400).send("Invalid data");
	}

	await Bron.createInstance({
		id,
        name
	});

	res.redirect("/user");
});

export default router;

