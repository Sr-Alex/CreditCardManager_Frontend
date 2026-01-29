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
	backgroundColor = "bg-blue",
	textColor = "text-white",
}: ActionButtonProps) {
	return (
		<button
			type={type}
			onClick={() => onClick()}
			disabled={disabled}
			className={`cursor-pointer ${className} ${backgroundColor} ${textColor}`}>
			{children}
		</button>
	);
}

export default ActionButton;
