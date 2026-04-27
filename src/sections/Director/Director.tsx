import Subtract from '../../assets/Subtract.png'; // Import the image
import './Director.scss';
import Container from "../../components/common/Container/Container";

const Director = () => {
  return (
    <Container maxWidth="xl">
      <div className="container__dir">
        <div className="content-text">
          <span>* </span>Логика в коде, харизма в дизайне. Ваш продукт должен продавать, даже когда вы спите.
        </div>

        <div className="image-wrapper">
          <img src={Subtract} alt="Director" />
        </div>

      </div>
        <div className="photo-bar"></div> {/* Bar touching bottom of photo */}
      <div className="abc">
        <div></div>
        <div className="caption">Основатель А-Я Agency</div>

      </div>
    </Container>
  );
};

export default Director;