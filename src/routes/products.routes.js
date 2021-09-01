import { Router } from "express";
const router = Router()

import * as productsCtrl from '../controllers/products.controller'
import {authJwt} from '../middlewares'
 


router.get('/create', productsCtrl.getProductForm) 

router.post('/create', productsCtrl.createProducts ) 

router.get('/', productsCtrl.getProducts )
 
router.get('/:productId',productsCtrl.getProductById )

router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProductById )

router.delete('/:productId',[authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById )


export default router;