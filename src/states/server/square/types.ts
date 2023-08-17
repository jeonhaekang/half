export interface Item {
  id: string;
  itemId: string;
  itemName: string;
  variationName: string;
  imageUrl: string | null;
  quantity: number;
  orderQuantity: number;
}
