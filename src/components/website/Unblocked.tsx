import styled from "@emotion/styled";
import countryToFlag from "../../api/countrytoflag.json";
import CountryEntry from "./CountryEntry";
function Unblocked(props: SectionProps) {
  const { sectionItems, className } = props;
  return (
    <div id="unblocked" className={className}>
      <h3 className="text-3xl mb-4">OPEN</h3>
      <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
        {sectionItems.map((v) => 
          <CountryEntry country={v} countryFlag={((countryToFlag as any)[v] as any) ? ((countryToFlag as any)[v] as any).image : ""} key={v} blocked={{ Blocked: false }} />
        )}
        {sectionItems.length < 1 ? <>
          <h4 className="bg-black text-white text-center py-4 text-3xl">NOT DETECTED OPEN IN ANY COUNTRY</h4>
        </> : <></>}
      </div>
    </div>
  );
}
export default styled(Unblocked)`
`;