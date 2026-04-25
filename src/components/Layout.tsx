// components/Layout.tsx
import type { ReactNode } from 'react';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import './Layout.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): React.ReactElement => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;