export default function SocketLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block w-4/5 text-center justify-center">
				{children}
			</div>
		</section>
	);
}
