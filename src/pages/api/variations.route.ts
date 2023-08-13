import type { NextApiRequest, NextApiResponse } from "next";
import type { CatalogItemVariation, CatalogObject } from "square";
import { square, supabase } from "~/states/server";

const getAllVariations = async (
  cursor?: string,
  variants: CatalogObject[] = []
): Promise<CatalogObject[]> => {
  const {
    result: { objects = [], cursor: _cursor }
  } = await square.catalogApi.listCatalog(cursor, "ITEM_VARIATION");

  if (_cursor) {
    return getAllVariations(_cursor, variants.concat(objects));
  }

  return variants.concat(objects);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const variations = await getAllVariations();

      const variantsPromises = variations
        .filter((variation) => !!variation.itemVariationData)
        .map(async (variation) => {
          const data = variation.itemVariationData as CatalogItemVariation;
          const name = (data.name as string) ?? "";
          const price = Number(data.priceMoney?.amount ?? 0);

          const itemId = data.itemId as string;

          await supabase.from("variations").insert({ id: variation.id, itemId, name, price });
        });

      await Promise.all(variantsPromises);

      return res.status(200).json({ message: "variants 생성 성공" });
    }
  } catch (error) {
    return res.status(500).json({ message: "variants 생성 실패" });
  }
}
