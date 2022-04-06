import styled from "@emotion/styled";
import CountryEntry from "./CountryEntry";
import countryToFlag from "../../api/countrytoflag.json";

function Possible(props: SectionProps) {
  const { sectionItems, className } = props;
  return (
    <div id="possible" className={className}>
      {sectionItems.length > 1 ? <>
        <h3 className="text-3xl mb-4">POSSIBLE</h3>
        <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
          {sectionItems.map((v) =>
            <CountryEntry country={v} countryFlag={((countryToFlag as any)[v] as any) ? ((countryToFlag as any)[v] as any).image : ""} key={v} blocked={{ Blocked: false, Possible: true }} />
          )}
        </div>
      </> : <></>}
    </div>
  );
}
export default styled(Possible)`
`;