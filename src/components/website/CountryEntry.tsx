import styled from "@emotion/styled";

function WebsiteEntry(props: CountryEntryProps) {
  const { blocked, country, className, countryFlag } = props;
  const today = new Date();
  return (
    <div id={country} className={className} onClick={() => console.log(blocked)}>
      <div className="bg-black p-5 h-36 relative">
        <div className="flex items-center">
          <h3 className="text-white text-2xl mr-2">{country.toUpperCase()}</h3>
          {countryFlag ? <img width="25" src={countryFlag} alt={country} /> : <></>}
        </div>
        <div className="mt-2 flex">
          <h4 className="text-white">{blocked?.Blocked ? "BLOCKED" : blocked?.Possible ? "POSSIBLE" : blocked?.Unknown ? "UNKNOWN" : "OPEN"}</h4>
          <h4 className="text-white ml-10">{today.toLocaleString("default", { month: "long" })} {today.getDay()}, {today.getFullYear()}<br/>12:00AM UTC</h4>
        </div>
        <div className={`w-10 h-10 absolute bottom-0 right-0 ${blocked?.Unknown ? "bg-unknown" : blocked?.Blocked ? "bg-blocked" : blocked?.Possible ? "bg-possible" : "bg-unblocked"}`} />
      </div>
    </div>
  );
}
export default styled(WebsiteEntry)`
`;