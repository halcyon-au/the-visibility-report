interface DefaultProps {
  className?: string;
}
interface LandingProps extends DefaultProps {
  SEARCH_MODE?: "Country" | "Site"
}
interface OONICountry {
  alpha_2: string,
  count: number,
  name: string
}