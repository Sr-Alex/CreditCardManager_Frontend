import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ContainerProps {
	children: ReactNode;
	title?: string;
	description?: string;
	backgroundColor?: string;
	textColor?: string;
	closeButton?: boolean;
	closeButtonHandler?: Function;
}

function Container({
	children,
	title,
	description,
	backgroundColor = "bg-white",
	textColor = "text-dark-blue",
	closeButton = false,
	closeButtonHandler = () => {},
}: ContainerProps) {
	return (
		<section
			className={`min-w-80 pt-6 pr-4 pb-2 pl-4 rounded-2xl shadow-md ${backgroundColor} ${textColor}`}>
			{title?.trim() && (
				<div className="flex w-full gap-2 mb-2">
					<div>
						<h3 className="text-lg font-bold">{title}</h3>
						{description && <p>{description}</p>}
					</div>
					{closeButton && (
						<button
							type="button"
							onClick={() => closeButtonHandler()}
							className="block ml-auto mb-2 cursor-pointer">
							<X
								size="2rem"
								className={`text-dark-slate transition-all duration-100 ease-in-out`}
							/>
						</button>
					)}
				</div>
			)}
			<div>{children}</div>
		</section>
	);
}
export default Container;
