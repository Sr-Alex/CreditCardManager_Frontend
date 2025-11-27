function FormContainer({ children }: { children: React.ReactNode }) {
	return (
		<section className="absoluteContainer">
			<div className="formContainer rounded box-shadow">{children}</div>
		</section>
	);
}

export default FormContainer;
