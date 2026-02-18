function ModalContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className="fixed top-0 left-0 z-50 w-dvw h-dvh bg-opaque backdrop-blur-xs">
			{children}
		</div>
	);
}

export default ModalContainer;
