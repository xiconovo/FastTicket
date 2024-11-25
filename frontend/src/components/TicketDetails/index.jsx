import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchTicketDetails, fetchStates, updateTicketState } from '../../userServices/userServices';
import {
    PageContainer,
    ContentContainer,
    TicketDetailContainer,
    TicketDetailRow,
    EditButton,
    ModalOverlay,
    ModalContainer,
    ModalFooter,
    StateDropdown,
    ObservationsInput,
} from './style';
import NavBar from '../NavBar';

function TicketDetails() {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [observations, setObservations] = useState('');
    const [states, setStates] = useState([]);

    const { data: ticket, isLoading, isError, refetch } = useQuery(['ticketDetails', id], () => fetchTicketDetails(id));

    const mutation = useMutation(updateTicketState, {
        onSuccess: () => {
            refetch();
            setIsModalOpen(false);
        },
        onError: (error) => {
            alert(error.response?.data?.error || 'Erro ao atualizar estado.');
        },
    });

    useEffect(() => {
        const loadStates = async () => {
            try {
                const fetchedStates = await fetchStates();
                setStates(fetchedStates);
            } catch (error) {
                console.error('Erro ao carregar estados:', error);
            }
        };
        loadStates();
    }, []);

    const handleEditState = () => {
        if (!ticket || ticket.state === 'Recusado' || ticket.state === 'Finalizado') {
            alert('Este ticket não pode ser alterado.');
            return;
        }
        setSelectedState(ticket.state || '');
        setObservations('');
        setIsModalOpen(true);
    };

    const handleSave = () => {
        console.log('Selected State:', selectedState);
        console.log('Data being sent:', {
            id: ticket.id,
            stateTitle: selectedState,
            observacoes: selectedState === 'Recusado' ? observations : '',
        });
    
        mutation.mutate({
            id: ticket.id,
            stateTitle: selectedState,
            observacoes: selectedState === 'Recusado' ? observations : '',
        });
    };

    if (isLoading) {
        return (
            <PageContainer>
                <NavBar />
                <ContentContainer>Carregando detalhes do ticket...</ContentContainer>
            </PageContainer>
        );
    }

    if (isError || !ticket) {
        return (
            <PageContainer>
                <NavBar />
                <ContentContainer>Erro ao carregar os detalhes do ticket.</ContentContainer>
            </PageContainer>
        );
    }

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString();
    };

    return (
        <PageContainer>
            <NavBar />
            <ContentContainer>
                <TicketDetailContainer>
                    <TicketDetailRow>
                        <strong>ID:</strong> {ticket.id}
                    </TicketDetailRow>
                    <TicketDetailRow>
                        <strong>Título:</strong> {ticket.title}
                    </TicketDetailRow>
                    <TicketDetailRow>
                        <strong>Descrição:</strong> {ticket.description}
                    </TicketDetailRow>
                    <TicketDetailRow>
                        <strong>Estado:</strong> {ticket.state || 'N/A'}
                    </TicketDetailRow>
                    <TicketDetailRow>
                        <strong>Departamento:</strong> {ticket.department || 'N/A'}
                    </TicketDetailRow>
                    <TicketDetailRow>
                        <strong>Observações:</strong> {ticket.observacoes || 'Nenhuma'}
                    </TicketDetailRow>
                    <TicketDetailRow>
                        <strong>Criado por:</strong> {ticket.creator?.email || 'N/A'}
                    </TicketDetailRow>
                    <TicketDetailRow>
                        <strong>Última atualização:</strong>{' '}
                        {ticket.updater?.email
                            ? `${ticket.updater.email} em ${formatDateTime(ticket.updated_at)}`
                            : 'N/A'}
                    </TicketDetailRow>
                    <EditButton onClick={handleEditState}>Editar Estado</EditButton>
                </TicketDetailContainer>
            </ContentContainer>

            {isModalOpen && (
                <ModalOverlay>
                    <ModalContainer>
                        <h2>Alterar Estado do Ticket</h2>
                        <StateDropdown
                            value={selectedState}
                            onChange={(e) => {
                                setSelectedState(e.target.value);
                                console.log('State changed to:', e.target.value);
                            }}
                        >
                            <option value="" disabled>
                                Selecione o novo estado
                            </option>
                            {states.map((state) => (
                                <option key={state.id} value={state.title}>
                                    {state.title}
                                </option>
                            ))}
                        </StateDropdown>
                        {selectedState === 'Recusado' && (
                            <ObservationsInput
                                placeholder="Motivo da recusa"
                                value={observations}
                                onChange={(e) => setObservations(e.target.value)}
                            />
                        )}
                        <ModalFooter>
                            <EditButton onClick={handleSave}>Salvar</EditButton>
                            <EditButton onClick={() => setIsModalOpen(false)}>Cancelar</EditButton>
                        </ModalFooter>
                    </ModalContainer>
                </ModalOverlay>
            )}
        </PageContainer>
    );
}

export default TicketDetails;
