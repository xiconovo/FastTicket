import React from 'react'
import { PageContainer, ContentContainer, CreateButton } from './style'
import NavBar from '../NavBar/index'
import TicketsTable from '../TicketsTable'
import { useNavigate } from 'react-router-dom';

function ClientView() {
  const navigate = useNavigate();

  const handleCreateTicket = () => {
    navigate('/home/create_ticket');
  };
  return (
    <PageContainer>
      <NavBar />
      <ContentContainer>
        <TicketsTable />
        <CreateButton onClick={handleCreateTicket}>
          Criar Ticket
        </CreateButton>
      </ContentContainer>
    </PageContainer>
  )
}

export default ClientView