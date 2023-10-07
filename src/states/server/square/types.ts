export interface Item {
  id: string;
  itemId: string;
  itemName: string;
  variationName: string;
  imageUrl: string | null;
  quantity: number;
  price: number;
  orderQuantity: number;
}
