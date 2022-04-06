import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { useWhoBlockedMe } from "../api/hooks";
import Blocked from "../components/website/Blocked";
import Possible from "../components/website/Possible";
import TopBar from "../components/website/TopBar";
import Unblocked from "../components/website/Unblocked";
import Unknown from "../components/website/Unknown";

function Website(props: DefaultProps) {
  const { site } = useParams();
  const { error, loading, unblocked, blocked, unknown, possible } = useWhoBlockedMe(site!);
  return (
    <>
      <TopBar />
      <div className="container mx-auto">
        {!loading ? <>
          <Blocked sectionItems={blocked} className="my-5" />
          <Possible sectionItems={possible} className="my-5" />
          <Unblocked sectionItems={unblocked} className="my-5" />
          <Unknown sectionItems={unknown} className="my-5" />
        </> : <h1>loading mmm yep</h1>
        }
      </div>
    </>
  );
}
export default styled(Website)`
`;