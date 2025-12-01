import Container from "./container";

function AbsoluteContainer({ children }: { children: React.ReactNode }) {
	return (
		<section className="absoluteContainer">
			<Container>{children}</Container>
		</section>
	);
}

export default AbsoluteContainer;
