import { NextApiRequest, NextApiResponse } from "next";
import { InventoryCount } from "square";
import { square } from "~/server";
import { bigIntToNumber } from "~/utils";

const getAllInventories = async (
  variationIds: string[],
  cursor?: string,
  counts: InventoryCount[] = []
): Promise<InventoryCount[]> => {
  const {
    result: { counts: _counts = [], cursor: _cursor }
  } = await square.inventoryApi.batchRetrieveInventoryCounts({
    cursor,
    catalogObjectIds: variationIds
  });

  if (_cursor) {
    return getAllInventories(variationIds, _cursor, counts.concat(_counts));
  }

  return counts.concat(_counts);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const allInventories = await getAllInventories(req.body.variationIds);

    return res.status(200).json(bigIntToNumber(allInventories));
  } catch (error) {
    return res.status(500).end({ message: "items 호출 실패" });
  }
}
