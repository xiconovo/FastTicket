import styled from "styled-components";

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
`;

export const TicketDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 50%;
`;

export const TicketDetailRow = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1rem;

    & > strong {
        font-weight: bold;
    }
`;


export const EditButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  width: 30%;
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

  &:disabled {
    background: #d3d3d3;
    cursor: not-allowed;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 400px;
  text-align: center;
`;

export const StateDropdown = styled.select`
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

export const ObservationsInput = styled.textarea`
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  resize: none;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;