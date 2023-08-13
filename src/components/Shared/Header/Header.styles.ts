import styled from "@emotion/styled";
import { flex, size } from "~/styles/mixins";

export const Header = styled.header`
  ${flex({ align: "center", justify: "between" })};

  ${size({ height: 50 })};

  padding: 0 12px;
`;
