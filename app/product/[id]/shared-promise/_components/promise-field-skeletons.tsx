import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductTextFromPromiseSkeleton() {
	return (
		<Card className="border-green-200 dark:border-green-800">
			<CardHeader>
				<div className="flex items-start justify-between gap-3">
					<div className="flex-1 space-y-2">
						<Skeleton className="h-8 w-3/4" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
					</div>
					<Badge variant="secondary" className="bg-green-100 text-green-800">
						🧩 Promise compartida
					</Badge>
				</div>
			</CardHeader>
		</Card>
	);
}

export function ProductPriceFromPromiseSkeleton() {
	return (
		<Card className="border-blue-200 dark:border-blue-800">
			<CardHeader>
				<div className="flex items-center justify-between gap-3">
					<div className="space-y-2">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-10 w-32" />
					</div>
					<Badge variant="secondary" className="bg-blue-100 text-blue-800">
						🧩 Promise compartida
					</Badge>
				</div>
			</CardHeader>
		</Card>
	);
}

export function ProductStockFromPromiseSkeleton() {
	return (
		<Card className="border-amber-200 dark:border-amber-800">
			<CardHeader>
				<div className="flex items-center justify-between gap-3">
					<div className="space-y-2">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-9 w-40" />
						<Skeleton className="h-3 w-48" />
					</div>
					<Badge variant="secondary" className="bg-amber-100 text-amber-800">
						🧩 Promise compartida
					</Badge>
				</div>
			</CardHeader>
		</Card>
	);
}
