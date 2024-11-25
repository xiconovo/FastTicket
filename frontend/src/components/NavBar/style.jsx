import styled from "styled-components";
import { BsPersonGear } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";

const breakpoints = {
    small_laptop: "1024px",
};


export const MainContainer = styled.div`
    display: flex;
    height: 10vh;
    background-color: white;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`

export const LogoContainer = styled.div`
    display: flex;
    margin-left: 1rem;
    height: 100%;
    width: fit-content;
    cursor: pointer;

    @media (max-width: ${breakpoints.small_laptop}) {
        margin-left: 0.5rem;
    }

    
`

export const Logo = styled.img`
    height: 100%;
    width: auto;
`

export const VerticalDivider = styled.div`
    display: flex;
    width: 1px;
    height: 70%;
    background-color: #d3d3d3;
    margin: 0 1rem;

    @media (max-width: ${breakpoints.small_laptop}) {
        margin: 0 0.5rem;
    }
`;

export const ContentNavBarContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: end;
    height: 100%;
`;

export const IconSettings = styled(BsPersonGear)`
  font-size: 5vh;
  color: #0098f8;
  transition: color 0.3s ease;

  &:hover {
    color: #6a00ff;
    cursor: pointer;
  }

  @media (max-width: ${breakpoints.small_laptop}) {
        font-size: 3.5vh;
    }
`

export const IconLogout = styled(IoIosLogOut)`
  font-size: 3vh;
  color: #0098f8;
  transition: color 0.3s ease;
  margin: 0 1rem;


  &:hover {
    color: #6a00ff;
    cursor: pointer;
  }

  @media (max-width: ${breakpoints.small_laptop}) {
        font-size: 2vh;
        margin: 0 0.5rem;
    }

`;