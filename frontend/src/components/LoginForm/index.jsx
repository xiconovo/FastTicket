import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../userServices/userServices';
import { PageContainer, LoginFormContainer, HeaderContainer, TitleContainer, LogoContainer, Logo, ContentContainer, FieldContainer, InputField, ButtonContainer, Button, HorizontalLine, Divider } from './style';
import logo from '../../resources/fastTicketLogo.png';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => loginUser(email, password),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      navigate('/home');
    },
    onError: (error) => {
      alert(error.response?.data?.error || 'Failed to login. Please try again.');
    },
  });

  const handleLogin = () => {
    mutation.mutate();
  };

  return (
    <PageContainer>
      <LoginFormContainer>
        <HeaderContainer>
          <TitleContainer>Welcome!</TitleContainer>
          <HorizontalLine />
        </HeaderContainer>
        <ContentContainer>
          <LogoContainer>
            <Logo src={logo} alt="FastTicket Logo" />
          </LogoContainer>
          <FieldContainer>
            <InputField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FieldContainer>
          <ButtonContainer>
            <Button onClick={handleLogin} disabled={mutation.isLoading}>
              {mutation.isLoading ? 'Loading...' : 'Login'}
            </Button>
          </ButtonContainer>
        </ContentContainer>
        <Divider />
      </LoginFormContainer>
    </PageContainer>
  );
}

export default LoginForm;
