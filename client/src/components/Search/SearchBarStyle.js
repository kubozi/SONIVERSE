import styled, { css, keyframes } from "styled-components";
import SearchIcon from "../../UI/Icons/SearchIcon";
import ArrowRightIcon from "../../UI/Icons/ArrowRight";

export const Container = styled.div`
  position: relative;
  ${({ hover }) =>
    hover &&
    css`
      width: 440;
    `}
`;

export const SearchInput = styled.input`
`;

/** icons */
const IconCommonCss = css`
`;

export const IconMagnifyingGlass = styled(SearchIcon)`
  ${IconCommonCss}
  fill: #303030;
  width: 20px;
`;

export const IconRightArrow = styled(ArrowRightIcon)`
  ${IconCommonCss}
  fill: #303030;
  width: 20px;
  
`;