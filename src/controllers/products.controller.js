import { render } from "express/lib/response";
import products from "../models/products";
import Product from "../models/products"



export const getProductForm = async (req,res) => {
    res.render('create', {pageTittle: 'Add product'})

}

export const createProducts = async (req,res) => {


 const { name, category, price, imgUrl} = req.body
 
  const newProduct  = new Product ({name,category,price,imgUrl});
 
  const productSaved = await newProduct.save() 

   res.status(201).json(productSaved)
  
}

export const getProducts = async (req,res) => {
    const products = await Product.find({}).lean()
    
    console.log(products)

    res.render('products',  {products});
    
}

// export const getProductByName = async(req,res) =>{
//     const name = req.params.name
//     const product = await Product.find(name)
//     res.status(200).json(products)
// }

export const getProductById = async (req,res) => {
   const productId = await Product.findById(req.params.productId).lean()
//    res.send('the product Id is ' + productId._id)
 res.render('detail', {product: productId});



//    res.status(200).json(product)
//    .then(product => {
//        console.log('product : ', product)
//    })

}

export const updateProductById = async (req,res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(updatedProduct)
}

export const deleteProductById = async (req,res) => {
    await Product.findByIdAndDelete(req.params.productId)
    res.status(204).json()
    
}