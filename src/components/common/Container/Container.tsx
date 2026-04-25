// components/common/Container.tsx
import type { ReactNode, ElementType } from 'react';
import React from 'react';
import './Container.scss';

type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  maxWidth?: ContainerMaxWidth;
}

const Container = ({ 
  children, 
  className = '', 
  as: Component = 'div',
  maxWidth = 'lg'
}: ContainerProps): React.ReactElement => {
  return (
    <Component className={`container container--${maxWidth} ${className}`}>
      {children}
    </Component>
  );
};

export default Container;