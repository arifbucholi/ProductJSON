// export interface Product {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   price: number;
//   discountPercentage: number;
//   rating: number;
//   stock: number;
//   brand: string;
//   thumbnail: string;
//   images: string[];
// }

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  sku: string;

  tags: string[];

  weight: number;

  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;

  dimensions: {
    width: number;
    height: number;
    depth: number;
  };

  reviews: Review[];

  meta: {
    barcode: string;
    qrCode: string;
    createdAt: string;
    updatedAt: string;
  };

  images: string[];

  thumbnail: string;
}