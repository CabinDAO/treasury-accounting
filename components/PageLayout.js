import { PageHeader, Container } from "../components";

export function PageLayout({ children }) {
  return (
    <>
      <PageHeader />
      <Container>{children}</Container>
    </>
  );
}
