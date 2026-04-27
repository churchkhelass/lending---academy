import React, { useState } from "react";
import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import "./ContactForm.scss";

const ContactForm = (): React.ReactElement => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      telegram: formData.get("telegram"),
      project: formData.get("project"),
    };
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    // Здесь добавить отправку на сервер
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="contact-form-wrapper">
      <Form
        className="contact-form"
        onSubmit={handleSubmit}
        validationBehavior="native"
      >
        <Fieldset className="contact-form__fieldset">
          {/* Имя */}
          <TextField
            isRequired
            name="name"
            className="contact-form__field"
            // classNames={{
            //   input: "contact-form__input",
            //   label: "contact-form__label",
            // }}
          >
            <Label style={{textAlign: 'start', fontSize: '5.5vw'}}>Имя</Label>
            <Input
              placeholder="Как к вам обращаться?"
              style={{textAlign: 'start', fontSize: '5.5vw'}}
              // size="lg"
            />
            {/* <Description>Введите ваше полное имя</Description> */}
            <FieldError />
          </TextField>

          {/* Телефон */}
          <TextField
            isRequired
            name="phone"
            className="contact-form__field"
            // classNames={{
            //   input: "contact-form__input",
            //   label: "contact-form__label",
            // }}
          >
            <Label style={{textAlign: 'start', fontSize: '5.5vw'}}>Телефон</Label>
            <Input
              placeholder="+7 (999) 999-99-99"
              style={{textAlign: 'start', fontSize: '5.5vw'}}
              type="tel"
            />
            {/* <Description>Для оперативной связи</Description> */}
            <FieldError />
          </TextField>

          {/* Telegram */}
          <TextField
            isRequired
            name="telegram"
            className="contact-form__field"
            // classNames={{
            //   input: "contact-form__input",
            //   label: "contact-form__label",
            // }}
          >
            <Label style={{textAlign: 'start', fontSize: '5.5vw'}}>Telegram</Label>
            <Input
              placeholder="@username"
              style={{textAlign: 'start', fontSize: '5.5vw'}}
            />
            {/* <Description>Ваш никнейм в Telegram</Description> */}
            <FieldError />
          </TextField>

          {/* Рассказать о проекте */}
          <TextField
            isRequired
            name="project"
            className="contact-form__field contact-form__field--textarea"
            // classNames={{
            //   input: "contact-form__textarea",
            //   label: "contact-form__label",
            // }}
          >
            <Label style={{textAlign: 'start', fontSize: '5.5vw'}}>Расскажите о вашем проекте</Label>
            <TextArea
              placeholder="Описание..."
              style={{textAlign: 'start', fontSize: '5.5vw'}}
              // minRows={4}
              // maxRows={10}
              // classNames={{
              //   input: "contact-form__textarea-input",
              // }}
            />
            {/* <Description>От 2 до 10 предложений. Чем подробнее, тем лучше</Description> */}
            <FieldError />
          </TextField>

          {/* Кнопка отправки */}
          <Button
            type="submit"
            size="lg"
            className="contact-form__submit"
          >
            СВЯЗАТЬСЯ
          </Button>
        </Fieldset>
      </Form>

      {isSubmitted && (
        <div className="contact-form__success">
          Спасибо! Мы свяжемся с вами в ближайшее время
        </div>
      )}
    </div>
  );
};

export default ContactForm;