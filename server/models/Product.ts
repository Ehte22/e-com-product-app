import mongoose, { Model, Schema } from "mongoose"

export interface IProduct {
    name: string
    price: string
    desc: string
    image: string
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const Product: Model<IProduct> = mongoose.model<IProduct>("product", productSchema)