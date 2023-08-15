import { NextApiRequest, NextApiResponse } from "next";
import { apollo } from "~/server";
import { CatalogWithVariations } from "~/server/graphql";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await apollo.query({
      query: CatalogWithVariations,
      variables: { merchantId: "ML6SRT9GPT3YV" }
    });

    return res.status(200).json(data.catalog.nodes);
  } catch (error) {
    return res.status(500).end({ message: "items 호출 실패" });
  }
}
