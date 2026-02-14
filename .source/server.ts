// @ts-nocheck
import * as __fd_glob_4 from "../content/docs/revalidation.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/implementation.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/concepts.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/benefits.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"benefits.mdx": __fd_glob_0, "concepts.mdx": __fd_glob_1, "implementation.mdx": __fd_glob_2, "index.mdx": __fd_glob_3, "revalidation.mdx": __fd_glob_4, });