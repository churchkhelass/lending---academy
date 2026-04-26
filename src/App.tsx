// App.tsx
import React from 'react';
import Layout from './components/Layout';
import Container from './components/common/Container/Container';
import Hero from './sections/Hero/Hero';
// import Features from './sections/Features';
// import Pricing from './sections/Pricing';
// import Contact from './sections/Contact';
import './styles/global.css';

function App(): React.ReactElement {
  return (
    <Layout>
      <Hero />
      <Container>
        <div>123</div>
        {/* <Features />
        <Pricing />
        <Contact /> */}
      </Container>
    </Layout>
  );
}

export default App;