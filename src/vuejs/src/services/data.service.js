import { post } from "./http-client.js";

export async function getTree(id) {
  try {
    const req = {
      query: {
        query: `select * from hdt.azdo.structured_trees where id = '${id}'`,
        params: [],
      },
      filter: {
        node_type: "structured_trees",
      },
    };

    const data = await post("/data/query", req);
    return data;
  } catch (error) {
    console.error("GET request error:", error);
    return [];
  }
}
