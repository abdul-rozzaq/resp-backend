import { Router } from "express";

import { addNewPage, addObject, deleteObject, getAllPages, getObject, getPage, updateObject } from "../services/apis.service.js";


const router = Router();


router.get("/", getAllPages)
router.post("/", addNewPage)

router.get("/apis/:name", getPage)
router.get("/apis/:name/:id", getObject)
router.post("/apis/:name", addObject)
router.put("/apis/:name/:id", updateObject)
router.delete("/apis/:name/:id", deleteObject)

export default router;

