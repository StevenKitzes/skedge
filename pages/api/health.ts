import { NextApiRequest, NextApiResponse } from "next"

function handler(req: NextApiRequest, res: NextApiResponse): NextApiResponse<string> {
  return res.status(200).end('healthy!')
}

export default handler
