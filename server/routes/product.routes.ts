import express from "express"
import * as productController from "../controllers/product.controller"
import { protectedRoute, restrict } from "../utils/protected"

const PRODUCT_ROUTER = express.Router()

PRODUCT_ROUTER
    .get("/", productController.getProducts)
    .get("/product/:id", productController.getProductById)
    .post("/add-product", protectedRoute, restrict("admin"), productController.addProduct)
    .put("/update-product/:id", protectedRoute, restrict("admin"), productController.updateProduct)
    .delete("/delete-product/:id", protectedRoute, restrict("admin"), productController.deleteProduct)

export default PRODUCT_ROUTER