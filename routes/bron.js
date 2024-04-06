import { Router } from "express";
const router = Router();

router.get ("/", (_, res) =>{
    res.render("bron")
})

export default router;

