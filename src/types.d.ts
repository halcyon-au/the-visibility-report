interface DefaultProps {
  className?: string;
}
interface RankingProps extends DefaultProps {
  countryRank: CountryRanking;
  number: number;
}
interface LandingProps extends DefaultProps {
  SEARCH_MODE?: "Country" | "Site"
}
interface OONICountry {
  alpha_2: string,
  count: number,
  name: string
}
interface CountryRanking {
  CountryName: string;
  Score: number;
}