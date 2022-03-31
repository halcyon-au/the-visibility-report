import styled from "@emotion/styled";

function TopBar() {
  return (
    <header id="navbar" className="py-6 bg-black text-white">
      <div className="container mx-auto">
        <h1 className="text-4xl mb-3">THE VISIBILITY REPORT</h1>
        <h2 className="text-6xl">WORLD RANKINGS</h2>
      </div>
    </header>
  );
}
export default styled(TopBar)`
      `;
