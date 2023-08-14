import type { NextApiRequest, NextApiResponse } from "next";
import type { CatalogObject } from "square";
import { square } from "~/states/server";
import { bigIntToNumber } from "~/utils";

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
    const allItems = await getAllItems();

    return res.status(200).json(bigIntToNumber(allItems));
  } catch (error) {
    return res.status(500).json({ message: "items 호출 실패" });
  }
}
