export default function Loading() {
	/* loader spinner */
	return (
		<main className="h-full w-full">
			<section>
				<div className="flex h-full w-full items-center justify-center">
					<div className="h-32 w-32 animate-spin rounded-full border-gray-900 border-b-2" />
				</div>
			</section>
		</main>
	);
}
