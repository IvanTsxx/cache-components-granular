// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"en/concepts.mdx": () => import("../content/docs/en/concepts.mdx?collection=docs"), "en/implementation.mdx": () => import("../content/docs/en/implementation.mdx?collection=docs"), "en/index.mdx": () => import("../content/docs/en/index.mdx?collection=docs"), "en/revalidation.mdx": () => import("../content/docs/en/revalidation.mdx?collection=docs"), "en/shared-promise.mdx": () => import("../content/docs/en/shared-promise.mdx?collection=docs"), "es/concepts.mdx": () => import("../content/docs/es/concepts.mdx?collection=docs"), "es/implementation.mdx": () => import("../content/docs/es/implementation.mdx?collection=docs"), "es/index.mdx": () => import("../content/docs/es/index.mdx?collection=docs"), "es/revalidation.mdx": () => import("../content/docs/es/revalidation.mdx?collection=docs"), "es/shared-promise.mdx": () => import("../content/docs/es/shared-promise.mdx?collection=docs"), }),
};
export default browserCollections;