import React, { useState, useEffect } from 'react';
import { PageContainer, ContentContainer, FormContainer, Input, Button, Select } from './style';
import { useNavigate } from 'react-router-dom';
import { createTicket, fetchDepartments } from '../../userServices/userServices';
import NavBar from '../NavBar/index';

function CreateTicket() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadDepartments = async () => {
            try {
                const fetchedDepartments = await fetchDepartments();
                setDepartments(fetchedDepartments);
            } catch (error) {
                console.error('Erro ao carregar departamentos:', error);
            }
        };
        loadDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !selectedDepartment) {
            alert('Todos os campos são obrigatórios.');
            return;
        }

        try {
            await createTicket({ title, description, department_title: selectedDepartment });
            alert('Ticket criado com sucesso!');
            navigate('/home');
        } catch (error) {
            console.error('Erro ao criar ticket:', error);
            alert('Erro ao criar ticket. Tente novamente.');
        }
    };

    return (
        <PageContainer>
            <NavBar />
            <ContentContainer>
                <FormContainer onSubmit={handleSubmit}>
                    <h2>Criar Novo Ticket</h2>
                    <Input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        <option value="" disabled>
                            Selecione um Departamento
                        </option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.title}>
                                {department.title}
                            </option>
                        ))}
                    </Select>
                    <Button type="submit">Criar Ticket</Button>
                </FormContainer>
            </ContentContainer>
        </PageContainer>
    );
}

export default CreateTicket;
