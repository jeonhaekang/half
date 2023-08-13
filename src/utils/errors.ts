import type { NextApiRequest, NextApiResponse } from "next";

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export default function catchErrorsFrom(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message || "An error occurred");
      }
    }
  };
}
