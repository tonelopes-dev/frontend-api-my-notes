import { Container } from "./styles";

export function Textarea({ vaule, ...rest }) {
  return <Container {...rest}>{vaule}</Container>;
}
