import styled from "styled-components";

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    // A navbar ocupa 10vh
`;

export const ContentContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
`;

export const Input = styled.input`
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    outline: none;

    &:focus {
        border-color: #6a00ff;
    }
`;

export const Button = styled.button`
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #00d1fe, #6a00ff);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: linear-gradient(135deg, #6a00ff, #00d1fe);
    }
`;

export const Select = styled.select`
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    outline: none;

    &:focus {
        border-color: #6a00ff;
    }
`;
