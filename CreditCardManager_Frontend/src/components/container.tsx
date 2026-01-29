import { X } from "lucide-react";
import type { ReactNode } from "react";
import ActionButton from "./actionButton";

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
	backgroundColor = "bg-white dark:bg-dark-blue",
	textColor = "text-dark-blue dark:text-white",
	closeButton = false,
	closeButtonHandler = () => {},
}: ContainerProps) {
	return (
		<section
			className={`min-w-80 min-h-32 h-fit pt-6 pr-4 pb-2 pl-4 rounded-2xl shadow-md border border-light-gray dark:border-dark-gray ${backgroundColor} ${textColor}`}>
			{title?.trim() && (
				<div className="flex w-full gap-2 mb-2">
					<div>
						<h3 className="text-lg font-bold">{title}</h3>
						{description && (
							<p className="text-md text-gray">{description}</p>
						)}
					</div>

					{closeButton && (
						<ActionButton
							type="button"
							onClick={() => closeButtonHandler()}
							className="block ml-auto mb-2 "
							backgroundColor="bg-transparent">
							<X
								size="2rem"
								className={`text-dark-slate transition-all duration-100 ease-in-out`}
							/>
						</ActionButton>
					)}
				</div>
			)}
			<div>{children}</div>
		</section>
	);
}
export default Container;
