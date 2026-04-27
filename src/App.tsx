// App.tsx
import React from 'react';
import Layout from './components/Layout';
import Container from './components/common/Container/Container';
import Hero from './sections/Hero/Hero';
import './styles/global.css';
import Director from './sections/Director/Director';
import Accardion from './sections/Accardion/Accardion';
import CaseGradient from './components/ui/GradientBackground/CaseGradient';
import Carusel from './sections/Carusel/Carusel';
import Comment from './sections/Comments/Comment';
import CommentGradient from './components/ui/GradientBackground/CommentGradient';
import ContactForm from './sections/ContactForm/ContactForm';
import StartProject from './sections/StartProject/StartProject';

function App(): React.ReactElement {
  return (
    <Layout>
      <Hero />
      <Container>
        <div>123</div>
        <Director />
        <Accardion />
        <CaseGradient />
        <Carusel />
        <Comment />
        <CommentGradient />
        <StartProject />
        <ContactForm />
      </Container>
    </Layout>
  );
}

export default App;