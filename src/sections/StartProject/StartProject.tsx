import Container from "../../components/common/Container/Container";
import { Button } from "@heroui/react";

const StartProject = () => {
   return (
      <Container maxWidth="md">
         <div style={{gap: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem'}}>

            <div>
               <p style={{color: 'black', fontSize: '1.25rem'}}>Давайте создадим ваш digital-продукт, который начнёт приносить клиентов!</p>
            </div>

            <Button style={{
               borderRadius: '8px',
               fontSize: '2rem',
               padding: '4.5vh 6vw',
               background: "black",
            }}>
               НАЧАТЬ ПРОЕКТ
            </Button>

         </div>
      </Container>
   )
}

export default StartProject;