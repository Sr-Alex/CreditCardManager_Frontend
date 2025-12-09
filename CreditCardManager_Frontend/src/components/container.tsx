import type { ReactNode } from "react";

interface ContainerProps {
	Title?: string;
	Description?: string;
	children: ReactNode;
}

function Container({ Title, Description, ...children }: ContainerProps) {
	return (
		<section className="min-w-28 pt-6 pr-4 pb-2 pl-4 rounded-2xl shadow-md bg-white">
			{Title?.trim() && (
				<div className="mb-2">
					<h3 className="text-lg font-bold text-dark-blue">
						{Title}
					</h3>
					<p>{Description}</p>
				</div>
			)}
			<div {...children}></div>
		</section>
	);
}
export default Container;
