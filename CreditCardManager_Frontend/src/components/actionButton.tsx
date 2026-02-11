import type { ReactNode } from "react";

interface ActionButtonProps {
	children: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type?: "submit" | "reset" | "button" | undefined;
	className?: string;
	backgroundColor?: string;
	textColor?: string;
}

function ActionButton({
	children,
	onClick = () => {},
	disabled = false,
	type = "button",
	className,
	backgroundColor = "bg-blue disabled:bg-gray hover:bg-gray dark:hover:bg-dark-slate",
	textColor = "text-white",
}: ActionButtonProps) {
	return (
		<button
			type={type}
			onClick={() => onClick()}
			disabled={disabled}
			className={`cursor-pointer ${className} ${backgroundColor} ${textColor} transition-color ease-in-out duration-100`}>
			{children}
		</button>
	);
}

export default ActionButton;
