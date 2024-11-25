import styled from "styled-components";

const breakpoints = {
    small_laptop: "1024px",
};


export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 100%;
`

export const TableContainer = styled.table`
    display: flex;
    flex-direction: column;
    border-collapse: collapse;
    border: 1px solid #d3d3d3;
    overflow-y: scroll;
`

export const TableHeader = styled.thead`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    
`

export const TableRow = styled.tr`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #d3d3d3;

  
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
        background-color: #e6f7ff; 
        cursor: pointer;
    }
`;

export const TableHeaderCell = styled.th`
  flex: 1;
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  background-color: #f5f5f5;
  border-bottom: 2px solid #d3d3d3;
  border: 1px solid #d3d3d3;

  @media (max-width: ${breakpoints.small_laptop}) {
    padding: 0.5rem;
  }
`;

export const TableBody = styled.tbody`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 40vh;
  min-height: 15vh;
  
`;

export const TicketCell = styled.td`
  flex: 1;
  padding: 1rem;
  text-align: center;
  color: #333;
  border: 1px solid #d3d3d3;

  @media (max-width: ${breakpoints.small_laptop}) {
    padding: 0.5rem;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  max-width: 80%;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const FilterInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;

  &:focus {
    border-color: #00d1fe;
  }
`;

export const FilterButton = styled.button`
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

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
  width: 100%;
  max-width: 80%; 
`;

export const ButtonPagination = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #00d1fe, #6a00ff);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin: 0.5rem;

  &:hover {
    background: linear-gradient(135deg, #6a00ff, #00d1fe);
  }

  &:disabled {
    background: #d3d3d3;
    cursor: not-allowed;
  }
`;

export const StateFilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

export const StateFilterButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background: ${(props) =>
    props.isActive ? 'linear-gradient(135deg, #6a00ff, #00d1fe)' : '#ddd'};
  box-shadow: ${(props) =>
    props.isActive ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none'};
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.isActive
        ? 'linear-gradient(135deg, #00d1fe, #6a00ff)'
        : '#ccc'};
  }
`;
