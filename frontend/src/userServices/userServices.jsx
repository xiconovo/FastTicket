import api from '../components/API/api';


// função para autenticação do utilizador
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};


// função que vai buscar a lista dos tickets
export const fetchTickets = async ({ text, states, offset, limit }) => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.get('/tickets/list_tickets', {
      params: {
        text: text || undefined,
        states: states?.length ? states.join(',') : undefined,
        offset,
        limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.tickets;
  } catch (error) {
    console.error('Erro ao buscar tickets:', error);
    throw new Error(error.response?.data?.error || 'Erro ao buscar tickets.');
  }
};

// função que vai buscar todos os detalhes de um ticket
export const fetchTicketDetails = async (ticketId) => {
  const token = localStorage.getItem('token');

  try {
      const response = await api.get(`/tickets/get_ticket_details/${ticketId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      return response.data;
  } catch (error) {
      console.error('Erro ao obter detalhes do ticket:', error);
      throw new Error(error.response?.data?.error || 'Erro ao obter detalhes do ticket.');
  }
};

// função de dar update a um ticket
export const updateTicketState = async ({ id, stateTitle, observacoes }) => {
  const token = localStorage.getItem('token');
  const response = await api.put(
    '/tickets/update_ticket',
    { id, stateTitle, observacoes }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// função para ir buscar os diferente estados
export const fetchStates = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get('/states', {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
  return response.data;
};

// função que cria um ticket
export const createTicket = async ({ title, description, department_title }) => {
  const token = localStorage.getItem('token');

  try {
      const response = await api.post(
          '/tickets/create_ticket',
          { title, description, department_title },
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );

      return response.data;
  } catch (error) {
      console.error('Erro ao criar ticket:', error);
      throw new Error(error.response?.data?.error || 'Erro ao criar ticket.');
  }
};

// função que busca os departamentos que existem
export const fetchDepartments = async () => {
  const token = localStorage.getItem('token');

  try {
      const response = await api.get('/departments', {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      return response.data;
  } catch (error) {
      console.error('Erro ao buscar departamentos:', error);
      throw new Error('Erro ao buscar departamentos.');
  }
};

// função que busca as informações do user
export const fetchUserInfo = async () => {
  const token = localStorage.getItem('token');

  try {
      const response = await api.get('/users/get_info', {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error('Erro ao buscar informações do utilizador:', error);
      throw new Error('Erro ao buscar informações do utilizador.');
  }
};

// função para dar update às informações do user
export const updateUserInfo = async (userInfo) => {
  const token = localStorage.getItem('token');

  try {
      const response = await api.put('/users/update_info', userInfo, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error('Erro ao atualizar informações do utilizador:', error);
      throw new Error('Erro ao atualizar informações do utilizador.');
  }
};