import styled from "styled-components";
import { TextField } from "@mui/material";

const breakpoints = {
    small_laptop: "1024px",
};


export const PageContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
        135deg,
        rgba(0, 209, 254, 0.4),
        rgba(106, 0, 255, 0.4),
        rgba(255, 0, 230, 0.4)  
    );
`

export const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: 25vw;
    background-color: #F1F1F1F1;
    border-radius: 5px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
    transform: translateY(50px);
    opacity: 0;
    animation: slideFadeIn 1s ease-in forwards;

    @keyframes slideFadeIn {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 10vh;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    @media (max-width: ${breakpoints.small_laptop}) {
        gap: 0.5rem;
    }
`

export const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-family: 'Roboto';
    

    @media (max-width: ${breakpoints.small_laptop}) {
        font-size: 1rem;
    }
`

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10vw;
    
`

export const Logo = styled.img`
    height: 100%;
    width: 100%;
`

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    flex: 1;
    gap: 1.5rem;
    
`

export const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 20vh;
    gap: 2rem;
    width: 100%;

`


export const InputField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        height: "3rem",
        width: "100%",
        fontSize: "1rem",
        "&:hover fieldset": {
            borderColor: "#6a00ff", // Cor da borda ao passar o rato por cima
        },
        "&.Mui-focused fieldset": {
            borderColor: "#6a00ff", // Cor da borda ao focar no campo
        },
    },
    "& .MuiInputBase-input": {
        fontSize: "1rem",
    },
    [`@media (max-width: ${breakpoints.small_laptop})`]: {
        "& .MuiOutlinedInput-root": {
            height: "2.5rem",
        },
        "& .MuiInputBase-input": {
            fontSize: "0.8rem",
        },
        "& .MuiFormLabel-root": {
            fontSize: "0.7rem",
        },
    },
});

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

`

export const Button = styled.button`
    color: white;
    background: linear-gradient(135deg, #00d1fe, #6a00ff, #ff00e6);
    background-size: 200% 200%;
    animation: gradient-animation 5s ease infinite;
    
    @keyframes gradient-animation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    @media (max-width: ${breakpoints.small_laptop}) {
        font-size: 0.8rem;
    }
`

export const HorizontalLine = styled.div`
    width: 70%;
    height: 1px;
    background-color: #d3d3d3;
`;


export const Divider = styled.div`
    width: 70%;
    height: 1px;
    background-color: #d3d3d3;
    margin: 2rem auto;
`;