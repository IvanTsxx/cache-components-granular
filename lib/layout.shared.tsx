import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18n } from "./i18n";

export function baseOptions(locale: string): BaseLayoutProps {
	return {
		i18n,
		nav: {
			title: locale === "es" ? "Demo iterativa" : "Iterative demo",
			transparentMode: "always",
		},
		githubUrl: "https://github.com/IvanTsxx/cache-components-granular",
	};
}
