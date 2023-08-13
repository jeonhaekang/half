import type { NextApiRequest, NextApiResponse } from "next";
import type { InventoryCount } from "square";
import { square, supabase } from "~/states/server";
import { getVariations } from "~/states/server/item";

const getAllInventories = async (
  catalogObjectIds: string[],
  cursor?: string,
  items: InventoryCount[] = []
): Promise<InventoryCount[]> => {
  const {
    result: { counts = [], cursor: _cursor }
  } = await square.inventoryApi.batchRetrieveInventoryCounts({ catalogObjectIds, cursor });

  if (_cursor) {
    return getAllInventories(catalogObjectIds, _cursor, items.concat(counts));
  }

  return items.concat(counts);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const variations = await getVariations();
      const variationIds = variations.map((variation) => variation.id);

      const inventories = await getAllInventories(variationIds);

      const inventoryMap = inventories.reduce((_items, _item) => {
        const { catalogObjectId } = _item;

        if (catalogObjectId) {
          return { ..._items, [catalogObjectId]: _item };
        }

        return _items;
      }, {} as { [key: string]: InventoryCount });

      const _variations = variations.map((variation) => {
        return { ...variation, quantity: Number(inventoryMap[variation.id]?.quantity) ?? 0 };
      });

      await supabase.from("variations").upsert(_variations);

      return res.status(200).json({ message: "variants 생성 성공" });
    }
  } catch (error) {
    return res.status(500).json({ message: "variants 생성 실패" });
  }
}
