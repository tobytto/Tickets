import { Router } from "express";
const router = Router()

import * as productsCtrl from '../controllers/products.controller'
import {authJwt} from '../middlewares'
 

router.post('/',[authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProducts ) 

router.get('/', productsCtrl.getProducts )

//router.get('/', authJwt.verifyToken, producstCrtl.addToCart) //Realizar funcion y ruta

//router.get('/cart',authJwt.verifyToken, productsCrtl.productlist ) //Realizar funcion y ruta 

router.get('/:productId',productsCtrl.getProductById )



router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.updateProductById )

router.delete('/:productId',[authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById )




export default router;