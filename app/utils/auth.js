// src/utils/auth.js

import { getSession } from "next-auth/react";

export async function getServerSession(req) {
  return await getSession({ req });
}
