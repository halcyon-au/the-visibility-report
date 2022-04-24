import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { useRanking } from "../api/hooks";
import Country from "../components/country/Country";
import Error from "../components/country/Error";

function IndividualCountry(props: DefaultProps) {
  const { className } = props;
  const { country } = useParams();
  const { data, isLoading, isError } = useRanking(country!);
  return (
    <div className={className}>
      {isLoading ?
        <>TODO LOADER</>
        : <>
          {!isError && data ?
            <>
              <Country country={data.countryRankings} />
            </> :
            <Error />
          }
        </>
      }
    </div>
  );
}
export default styled(IndividualCountry)`
`;
