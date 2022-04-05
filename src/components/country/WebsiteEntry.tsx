import styled from "@emotion/styled";

function WebsiteEntry(props: WebsiteEntryProps) {
  const { blocked, website, className, websiteIcon } = props;
  const today = new Date();
  return (
    <div id={website} className={className} onClick={() => console.log(blocked)}>
      <div className="bg-black p-5 h-36 relative">
        <div className="flex items-center">
          <h3 className="text-white text-2xl mr-2">{website.toUpperCase().replace("HTTP://", "").replace("HTTPS://", "").replace("/", "").replace("WWW.", "")}</h3>
          {websiteIcon ? <img width="25" src={websiteIcon} alt={website} /> : <></>}
        </div>
        <div className="mt-2 flex">
          <h4 className="text-white">{blocked?.Blocked ? "BLOCKED" : blocked?.Possible ? "POSSIBLE" : "OPEN"}</h4>
          <h4 className="text-white ml-10">{today.toLocaleString("default", { month: "long" })} {today.getDay()}, {today.getFullYear()}<br/>12:00AM UTC</h4>
        </div>
        <div className={`w-10 h-10 absolute bottom-0 right-0 ${blocked?.Blocked ? "bg-blocked" : blocked?.Possible ? "bg-possible" : "bg-unblocked"}`} />
      </div>
    </div>
  );
}
export default styled(WebsiteEntry)`
`;