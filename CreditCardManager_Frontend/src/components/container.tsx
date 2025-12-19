import type { ReactNode } from "react";

interface ContainerProps {
	Title?: string;
	Description?: string;
	ClassName?: string;
	children: ReactNode;
}

function Container({
	Title,
	Description,
	ClassName,
	children,
}: ContainerProps) {
	return (
		<section
			className={`min-w-28 pt-6 pr-4 pb-2 pl-4 rounded-2xl shadow-md text-dark-blue ${ClassName}`}>
			{Title?.trim() && (
				<div className="mb-2">
					<h3 className="text-lg font-bold">{Title}</h3>
					{Description && <p>{Description}</p>}
				</div>
			)}
			<div>{children}</div>
		</section>
	);
}
export default Container;
