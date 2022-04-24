import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { useWhoBlockedMe } from "../api/hooks";
import Blocked from "../components/website/Blocked";
import Possible from "../components/website/Possible";
import TopBar from "../components/website/TopBar";
import Unblocked from "../components/website/Unblocked";
import Unknown from "../components/website/Unknown";

function Website(props: DefaultProps) {
  const { className } = props;
  const { site } = useParams();
  const { isError, isLoading, data } = useWhoBlockedMe(site!);
  return (
    <div className={className}>
      <TopBar />
      <div className="container mx-auto">
        {!isLoading ?
          !isError && data ? <>
            <Blocked sectionItems={data.blocked} className="my-5" />
            <Possible sectionItems={data.possible} className="my-5" />
            <Unblocked sectionItems={data.unblocked} className="my-5" />
            <Unknown sectionItems={data.unknown} className="my-5" />
          </> : 
            <>
              <h1>ERROR</h1>
            </>
          : <h1>loading mmm yep</h1>
        }
      </div>
    </div>
  );
}
export default styled(Website)`
`;