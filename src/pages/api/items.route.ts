import type { NextApiRequest, NextApiResponse } from "next";
import type { CatalogItem, CatalogObject } from "square";
import { square, supabase } from "~/states/server";

const getAllItems = async (
  cursor?: string,
  items: CatalogObject[] = []
): Promise<CatalogObject[]> => {
  const {
    result: { objects = [], cursor: _cursor }
  } = await square.catalogApi.listCatalog(cursor, "ITEM");

  if (_cursor) {
    return getAllItems(_cursor, items.concat(objects));
  }

  return items.concat(objects);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const items = await getAllItems();

      const itemsPromises = items
        .filter((item) => !!item.itemData)
        .map(async (item) => {
          const itemData = item.itemData as CatalogItem;
          const itemName = itemData.name as string;

          const imagePromises = itemData.imageIds?.map(async (imageId) => {
            const image = await square.catalogApi.retrieveCatalogObject(imageId);
            const imageData = image.result.object?.imageData;

            const imageUrl = imageData?.url;

            if (imageUrl) {
              await supabase.from("images").insert({ id: imageId, itemId: item.id, imageUrl });
            }
          });

          if (imagePromises) {
            await Promise.all(imagePromises);
          }

          await supabase.from("items").insert({ id: item.id, name: itemName });
        });

      await Promise.all(itemsPromises);

      return res.status(200).json({ message: "items 생성 성공" });
    }
  } catch (error) {
    return res.status(500).json({ message: "items 생성 실패" });
  }
}
