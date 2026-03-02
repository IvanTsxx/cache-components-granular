// @ts-nocheck
import * as __fd_glob_9 from "../content/docs/es/shared-promise.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/es/revalidation.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/es/index.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/es/implementation.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/es/concepts.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/en/shared-promise.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/en/revalidation.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/en/index.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/en/implementation.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/en/concepts.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"en/concepts.mdx": __fd_glob_0, "en/implementation.mdx": __fd_glob_1, "en/index.mdx": __fd_glob_2, "en/revalidation.mdx": __fd_glob_3, "en/shared-promise.mdx": __fd_glob_4, "es/concepts.mdx": __fd_glob_5, "es/implementation.mdx": __fd_glob_6, "es/index.mdx": __fd_glob_7, "es/revalidation.mdx": __fd_glob_8, "es/shared-promise.mdx": __fd_glob_9, });