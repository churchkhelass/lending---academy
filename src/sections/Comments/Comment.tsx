// Comment.tsx
import './Comment.scss';
import Container from '../../components/common/Container/Container';
import { Avatar } from "@heroui/react";


const items = [
   {
      id: 1,
      description: `Это самый высокий уровень профессионализма, с которым я когда-либо
      сталкивался за те годы, что я нанимаю людей в этой области. У вас складывается четкое
      впечатление, что вы являетесь частью продуктивной команды.`,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      name: 'ИВАН ПЕТРОВ',
      title: 'Маркетолог из Роснефти',
   },
]

export const Comment = () => {
   return (
      <div style={{ width: '100%', backgroundColor: '#1A1A1A', paddingTop: '100px', }}>
         <Container maxWidth="md">
            <p>ОТЗЫВЫ</p>

            <div className={`comment`}>
               {items.map((item, _) => (
                  <div key={item.id} className="comment__content">
                     <blockquote className="comment__quote">
                        <span className="comment__quote-icon">“</span>
                        {item.description}
                     </blockquote>

                     <div className="comment__footer">
                        <div className="comment__author">
                           {item.image && (
                              <Avatar>
                                 <Avatar.Image alt="Иван Петров" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
                                 <Avatar.Fallback>ИП</Avatar.Fallback>
                              </Avatar>
                           )}
                           <div className="comment__author-info">
                              <p className="comment__author-name">{item.name}</p>
                              <p className="comment__author-title">{item.title}</p>
                           </div>
                        </div>


                     </div>
                  </div>))}
            </div>
         </Container>
      </div>
   );
};

export default Comment;