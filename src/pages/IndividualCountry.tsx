import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { useRanking } from "../api/hooks";
import Country from "../components/country/Country";
import Error from "../components/country/Error";


function IndividualCountry(props: DefaultProps) {
  const { country } = useParams();
  const { error, data, loading } = useRanking(country!);
  return (
    <>
      {loading ?
        <>TODO LOADER</>
        : <>
          {error ?
            <Error />
            : <>
              <Country country={data!} />
            </>
          }
        </>
      }
    </>
  );
}
export default styled(IndividualCountry)`
`;