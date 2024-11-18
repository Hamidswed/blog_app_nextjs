import Header from "@/components/Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container xl:max-w-screen-xl">{children}</div>
    </>
  );
}

export default Layout;
