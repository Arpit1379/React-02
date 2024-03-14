import { Router } from 'express';
import { createProduct, getProduct, getSingleProduct, updateProduct, deleteProduct } from "../Controllers/product.js";
import upload from '../utils/multerConfig.js';

const router=Router();

router.post("/",upload.single('myFile'),createProduct);
router.get('/',getProduct);
router.get('/:id',getSingleProduct);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);

export default router;