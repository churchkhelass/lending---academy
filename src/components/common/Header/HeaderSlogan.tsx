import React from "react";
import { Button } from '@heroui/react';
import './HeaderSlogan.scss';

const HeaderSlogan = (): React.ReactElement => {
   return (
      <div style={{
         // position: 'absolute',
         // top: '57vh',
         // left: '50%',
         // transform: 'translate(-50%, -50%)',
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         gap: '2rem',
         
         zIndex: 5,
      }} className="header-slogan-container">
         <div className="header-slogan">
            <span>Ваш</span> проект – <span>наша</span> зона ответственности
         </div>
         <Button size="lg" className="footer__button negative"> начать проект</Button>
      </div>
   )
}

export default HeaderSlogan;