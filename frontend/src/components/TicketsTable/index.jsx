import React, { useState, useEffect } from 'react';
import {
    MainContainer,
    TableContainer,
    TableHeader,
    TableBody,
    TableRow,
    TableHeaderCell,
    TicketCell,
    FilterInput,
    FilterContainer,
    PaginationContainer,
    ButtonPagination,
    StateFilterContainer,
    StateFilterButton,
} from './style';
import { useQuery } from '@tanstack/react-query';
import { fetchTickets, fetchStates } from '../../userServices/userServices';
import { useNavigate } from 'react-router-dom';

function TicketsTable() {
    const [filterText, setFilterText] = useState('');
    const [filterStates, setFilterStates] = useState([]);
    const [page, setPage] = useState(0);
    const [states, setStates] = useState([]);
    const navigate = useNavigate();
    const limit = 10;

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

    const { data: tickets = [], isLoading, isError } = useQuery(
        ['tickets', { filterText, filterStates, page, limit }],
        () =>
            fetchTickets({
                text: filterText,
                states: filterStates,
                offset: page * limit,
                limit,
            }),
        {
            keepPreviousData: true,
        }
    );

    const handleRowClick = (id) => {
        navigate(`/home/ticket_details/${id}`);
    };

    const toggleStateFilter = (stateTitle) => {
        setFilterStates((prev) =>
            prev.includes(stateTitle)
                ? prev.filter((title) => title !== stateTitle)
                : [...prev, stateTitle]
        );
    };

    return (
        <MainContainer>
            <FilterContainer>
                <FilterInput
                    type="text"
                    placeholder="Procura os teus tickets..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </FilterContainer>

            <StateFilterContainer>
                {states.map((state) => (
                    <StateFilterButton
                        key={state.id}
                        isActive={filterStates.includes(state.title)}
                        onClick={() => toggleStateFilter(state.title)}
                    >
                        {state.title}
                    </StateFilterButton>
                ))}
            </StateFilterContainer>

            {isError && <p>Erro ao carregar os tickets. Tente novamente.</p>}

            {isLoading && <p>Carregando tickets...</p>}

            {!isLoading && (
                <TableContainer>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Título</TableHeaderCell>
                            <TableHeaderCell>Data de Criação</TableHeaderCell>
                            <TableHeaderCell>Data da Última Atualização</TableHeaderCell>
                            <TableHeaderCell>Departamento Responsável</TableHeaderCell>
                            <TableHeaderCell>Estado</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tickets.map((ticket, index) => (
                            <TableRow
                                key={index}
                                onClick={() => handleRowClick(ticket.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <TicketCell>{ticket.title}</TicketCell>
                                <TicketCell>{new Date(ticket.createdAt).toLocaleDateString()}</TicketCell>
                                <TicketCell>{ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleDateString() : 'N/A'}</TicketCell>
                                <TicketCell>{ticket.Department?.title || 'N/A'}</TicketCell>
                                <TicketCell>{ticket.State?.title || 'N/A'}</TicketCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            )}

            <PaginationContainer>
                <ButtonPagination
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={isLoading || page === 0}
                >
                    Página Anterior
                </ButtonPagination>
                <ButtonPagination
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={isLoading || tickets.length < limit}
                >
                    Próxima Página
                </ButtonPagination>
            </PaginationContainer>
        </MainContainer>
    );
}

export default TicketsTable;
