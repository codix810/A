// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


const products =[
  {
    "id": 1,
    "title": "T-shirt",
    "description": "Casual women's T-shirt made of soft cotton.",
    "price": 300.00,
    "discount": 0,
    "gender": "female",
    "colors": ["blue", "black"],
    "sizes": ["S", "M", "L"],
    "image":"/New/Frame 33.png",
    "rating": { "average": 4.8, "count": 5, "reviews": [] },
    "stock": 8,
    "category": "tshirts"
  },
  {
    "id": 2,
    "title": "T-shirt",
    "description": "Men's casual T-shirt with modern design.",
    "price": 900.00,
    "discount": 0,
    "gender": "male",
    "colors": ["blue", "black"],
    "sizes": ["S", "M", "L"],
    "image":"/New/Frame 32.png",
    "rating": { "average": 4.8, "count": 5, "reviews": [] },
    "stock": 8,
    "category": "tshirts"
  },
  {
    "id": 3,
    "title": "T-shirt",
    "description": "High-quality men's T-shirt suitable for daily wear.",
    "price": 1700.00,
    "discount": 0,
    "gender": "male",
    "colors": ["blue", "black"],
    "sizes": ["S", "M", "L"],
    "image": "/New/Frame 34.png",
    "rating": { "average": 4.8, "count": 5, "reviews": [] },
    "stock": 8,
    "category": "tshirts"
  },
  {
    "id": 4,
    "title": "T-shirt",
    "description": "Trendy men's T-shirt available in multiple colors.",
    "price": 100.00,
    "discount": 0,
    "gender": "male",
    "colors": ["blue", "black"],
    "sizes": ["S", "M", "L"],
    "image": "/New/Frame 38.png",
    "rating": { "average": 4.8, "count": 5, "reviews": [] },
    "stock": 8,
    "category": "tshirts"
  },
  {
    "id": 5,
    "title": "T-shirt",
    "description": "Stylish T-shirt with comfortable fit for men.",
    "price": 1900.00,
    "discount": 0,
    "gender": "male",
    "colors": ["blue", "black"],
    "sizes": ["S", "M", "L"],
    "image": "/New/image 10.png",
    "rating": { "average": 4.8, "count": 5, "reviews": [] },
    "stock": 8,
    "category": "tshirts"
  },
  {
    "id": 6,
    "title": "T-shirt",
    "description": "Men's cotton T-shirt, perfect for everyday style.",
    "price": 1800.00,
    "discount": 0,
    "gender": "male",
    "colors": ["blue", "black"],
    "sizes": ["S", "M", "L"],
    "image": "/New/image 9.png",
    "rating": { "average": 4.8, "count": 5, "reviews": [] },
    "stock": 8,
    "category": "tshirts"
  },
  {
    "id": 7,
    "title": "T-shirt",
    "description": "Breathable fabric T-shirt for men in various sizes.",
    "price": 900.00,
    "discount": 0,
    "gender": "male",
    "colors": ["blue", "black"],
    "sizes": ["S", "M", "L"],
    "image": "/New/image 8.png",
    "rating": { "average": 4.8, "count": 5, "reviews": [] },
    "stock": 8,
    "category": "tshirts"
  },
  {
    "id": 8,
    "title": "T-shirt",
    "description": "Comfortable men's T-shirt with modern cut.",
    "price": 500.00,
    "discount": 0,
    "gender": "male",
    "colors": ["blue", "black"],
    "sizes": ["S", "M", "L"],
    "image": "/New/image 7.png",
    "rating": { "average": 4.8, "count": 5, "reviews": [] },
    "stock": 8,
    "category": "tshirts"
  },
  {
    "id": 9,
    "title": "T-shirt",
    "description": "Basic men's T-shirt with round neck.",
    "price": 250.00,
    "discount": 0,
    "gender": "male",
    "colors": ["blue", "black"],
    "sizes": ["S", "M", "L"],
    "image": "/ProDetails/image 1.png",
    "rating": { "average": 4.8, "count": 5, "reviews": [] },
    "stock": 8,
    "category": "tshirts"
  },
  {
    "id": 10,
    "title": "Shirt",
    "description": "Men's formal shirt made with premium fabric.",
    "price": 300.00,
    "discount": 0,
    "gender": "male",
    "colors": ["blue", "black"],
    "sizes": ["S", "M", "L"],
    "image": "/Top/Frame 32.png",
    "rating": { "average": 4.8, "count": 5, "reviews": [] },
    "stock": 8,
    "category": "shirts"
  },
  {
    "id": 11,
    "title": "T-shirt",
    "description": "Trendy T-shirt designed for casual wear.",
    "price": 1500.00,
    "discount": 0,
    "gender": "male",
    "colors": ["blue", "black"],
    "sizes": ["S", "M", "L"],
    "image": "/Top/Frame 33.png",
    "rating": { "average": 4.8, "count": 5, "reviews": [] },
    "stock": 8,
    "category": "tshirts"
  },
  {
    "id": 12,
    "title": "T-shirt",
    "description": "Men's T-shirt with soft fabric and comfort fit.",
    "price": 100.00,
    "discount": 0,
    "gender": "male",
    "colors": ["blue", "black"],
    "sizes": ["S", "M", "L"],
    "image": "/Top/Frame 34.png",
    "rating": { "average": 4.8, "count": 5, "reviews": [] },
    "stock": 8,
    "category": "tshirts"
  },
  {
    "id": 13,
    "title": "T-shirt",
    "description": "Classic plain men's T-shirt available in multiple colors.",
    "price": 1200.00,
    "discount": 0,
    "gender": "male",
    "colors": ["blue", "black"],
    "sizes": ["S", "M", "L"],
    "image": "/Top/Frame 38.png",
    "rating": { "average": 4.8, "count": 5, "reviews": [] },
    "stock": 8,
    "category": "tshirts"
  }
]




export async function GET() {
  return NextResponse.json(products);
}
// export default function handler(req:NextApiRequest , res:NextApiResponse){
//    return res.status(200).json(products)
// }