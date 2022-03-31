import styled from "@emotion/styled";

function WebsiteEntry(props: WebsiteEntry) {
  const { blocked, website, className, websiteIcon } = props;
  const today = new Date();
  return (
    <div id={website} className={className}>
      <div className="bg-black p-5 w-72 relative">
        <div className="flex items-center">
          <h3 className="text-white text-2xl mr-2">{website.toUpperCase().replace("HTTP://", "").replace("HTTPS://", "").replace("/", "").replace("WWW.", "")}</h3>
          {websiteIcon ? <img width="25" src={websiteIcon} alt={website} /> : <></>}
        </div>
        <div className="mt-2 flex">
          <h4 className="text-white">{blocked ? "BLOCKED" : "OPEN"}</h4>
          <h4 className="text-white ml-10">{today.toLocaleString("default", { month: "long" })} {today.getDay()}, {today.getFullYear()}<br/>12:00AM UTC</h4>
        </div>
        <div className={`w-10 h-10 absolute bottom-0 right-0 ${blocked ? "bg-red-600" : "bg-green-600"}`} />
      </div>
    </div>
  );
}
export default styled(WebsiteEntry)`
`;