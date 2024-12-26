import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import uploadProduct from "../utils/uploadProduct"
import cloudinary from "../utils/uploadConfig"
import { Product } from "../models/Product"

export const addProduct = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    uploadProduct(req, res, async (err: any) => {

        if (err) {
            return res.status(400).json({ message: err.message || 'Upload error' })
        }

        let productUrl
        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path)
            productUrl = secure_url
        }

        await Product.create({ ...req.body, image: productUrl })
        res.status(200).json({ message: 'Product Add Successfully' })
    })
})

export const getProducts = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const result = await Product.find()
    res.status(200).json({ message: "Products Fetch Successfully", result })
})

export const getProductById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params
    const result = await Product.findById(id)
    res.status(200).json({ message: "Product By Id Fetch Successfully", result })
})

export const updateProduct = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    uploadProduct(req, res, async (err: any) => {

        if (err) {
            return res.status(400).json({ message: err.message || 'Upload error' })
        }

        const { id } = req.params

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let productUrl
        if (req.file) {
            try {
                const publicId = product.image.split('/').pop()?.split('.')[0]
                publicId && await cloudinary.uploader.destroy(publicId)

                const { secure_url } = await cloudinary.uploader.upload(req.file.path)
                productUrl = secure_url
            } catch (error: any) {
                return res.status(500).json({ message: 'Failed to upload new image', error: error.message });
            }
        }

        await Product.findByIdAndUpdate(id, { ...req.body, image: productUrl })
        res.status(200).json({ message: 'Product Update Successfully' })
    })
})

export const deleteProduct = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    const result = await Product.findById(id)
    if (!result) {
        return res.status(404).json({ message: "Product Not Found" })
    }

    if (result.image) {
        const publicId = result.image.split('/').pop()?.split('.')[0]
        publicId && await cloudinary.uploader.destroy(publicId)
    }

    await Product.findByIdAndDelete(id)
    res.status(200).json({ message: 'User Delete Successfully' })
})
