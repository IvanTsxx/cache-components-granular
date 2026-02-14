// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"benefits.mdx": () => import("../content/docs/benefits.mdx?collection=docs"), "concepts.mdx": () => import("../content/docs/concepts.mdx?collection=docs"), "implementation.mdx": () => import("../content/docs/implementation.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "revalidation.mdx": () => import("../content/docs/revalidation.mdx?collection=docs"), "shared-promise.mdx": () => import("../content/docs/shared-promise.mdx?collection=docs"), }),
};
export default browserCollections;