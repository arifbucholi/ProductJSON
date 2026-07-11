export const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export function getDiscountedPrice(
  price: number,
  discountPercentage: number
): number {
  return price * (1 - discountPercentage / 100);
}