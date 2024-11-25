import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/index';
import { PageContainer, ContentContainer, FormContainer, Input, Button, Select } from './style';
import { fetchUserInfo, updateUserInfo, fetchDepartments } from '../../userServices/userServices';
import { useNavigate } from 'react-router-dom';

function ClientInfo() {
    const [userData, setUserData] = useState({});
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const userInfo = await fetchUserInfo();
                const fetchedDepartments = await fetchDepartments();
                setUserData(userInfo);
                setDepartments(fetchedDepartments);
                setName(userInfo.name);
                setSelectedDepartment(userInfo.Department?.id || '');
            } catch (error) {
                console.error('Erro ao carregar informações:', error);
            }
        };

        loadData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentPassword) {
            alert('Introduza a senha antiga para alterar as suas informações.');
            return;
        }

        try {
            await updateUserInfo({
                name,
                currentPassword,
                newPassword: newPassword || undefined,
                id_department: selectedDepartment || undefined,
            });
            alert('Informações atualizadas com sucesso!');
            navigate('/home');
        } catch (error) {
            console.error('Erro ao atualizar informações:', error);
            alert('Erro ao atualizar informações. Verifique a senha antiga.');
        }
    };

    return (
        <PageContainer>
            <NavBar />
            <ContentContainer>
                <FormContainer onSubmit={handleSubmit}>
                    <h2>Perfil do Utilizador</h2>
                    <Input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Senha Antiga"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Nova Senha (opcional)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        <option value="" disabled>
                            Selecione um Departamento
                        </option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.title}
                            </option>
                        ))}
                    </Select>
                    <Button type="submit">Atualizar Informações</Button>
                </FormContainer>
            </ContentContainer>
        </PageContainer>
    );
}

export default ClientInfo;
