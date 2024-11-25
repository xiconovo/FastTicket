import styled from "styled-components";

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    // navbar height is 10vh
`

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const CreateButton = styled.button`
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #00d1fe, #6a00ff);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
    margin-bottom: 1rem;

    &:hover {
        background: linear-gradient(135deg, #6a00ff, #00d1fe);
    }
`;