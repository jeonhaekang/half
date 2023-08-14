import type { NextApiRequest, NextApiResponse } from "next";
import type { InventoryCount } from "square";
import { square, supabase } from "~/states/server";
import catchErrorsFrom from "~/utils/errors";

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

export default catchErrorsFrom(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const variations = await getVariations();
    const { data: variations, error } = await supabase.from("variations").select("*");

    if (error) throw error;

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

    res.status(200).json({ message: "inventory 업데이트 성공" });
  } catch (error) {
    throw new Error("inventory 업데이트 실패");
  }
});
