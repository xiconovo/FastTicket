import React from 'react'
import { MainContainer, LogoContainer, Logo, VerticalDivider, ContentNavBarContainer, IconSettings, IconLogout } from './style'
import logo from '../../resources/fastTicketLogo.png';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function NavBar() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        localStorage.removeItem('token');

        queryClient.clear();

        navigate('/');
    };


    return (
        <MainContainer>
            <LogoContainer onClick={() => navigate('/home')}>
                <Logo src={logo} alt="FastTicket Logo" />
            </LogoContainer>
            <VerticalDivider />
            <ContentNavBarContainer>
                <IconSettings onClick={() => navigate('/home/client_info')} />
                <IconLogout onClick={handleLogout} />
            </ContentNavBarContainer>
        </MainContainer>
    )
}

export default NavBar