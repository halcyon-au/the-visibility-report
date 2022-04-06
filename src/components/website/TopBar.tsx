import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

function TopBar(props: TopBarOverride) {
  const { site } = useParams();
  const { overrideText } = props;
  return (
    <header id="navbar" className="py-6 bg-black text-white">
      <div className="container mx-auto">
        <h1 className="text-4xl mb-3">THE VISIBILITY REPORT</h1>
        <h2 className="text-6xl">{overrideText ? overrideText.toUpperCase() : site?.toUpperCase()}</h2>
      </div>
    </header>
  );
}
export default styled(TopBar)`
      `;
