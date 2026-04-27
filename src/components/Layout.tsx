// components/Layout.tsx
import type { ReactNode } from 'react';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import './Layout.scss';
import FooterGradient from './ui/GradientBackground/FooterGradient';
import HeaderGradient from './ui/GradientBackground/HeaderGradient';
import HeaderMathCurves from './ui/MathCurves/HeaderMathCurves';
import HeaderSlogan from './common/Header/HeaderSlogan';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): React.ReactElement => {



  return (
    <div className="layout">
      <Header />
      <HeaderMathCurves />
        <HeaderSlogan />
      <HeaderGradient />
      <main className="layout__main">
        {children}
      </main>
      <FooterGradient />

      {/* <div className='black'></div> */}
      
      <Footer />
    </div>
  );
};

export default Layout;