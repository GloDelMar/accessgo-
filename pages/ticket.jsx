import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

// npm i @emailjs/browser

const Contact = () => {
  const form = useRef();
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          setMessage("Ticket enviado con éxito.");
        },
        (error) => {
          console.log(error.text);
          setMessage("Error al enviar el Ticket.");
        }
      );
  };

  return (
    <StyledContactForm>
      <h1>Formulario Para Levantamiento de Ticket de Soporte Técnico</h1>
      <form ref={form} onSubmit={sendEmail} encType="multipart/form-data">
        <label>Name</label>
        <input type="text" name="to_name" required />
        <label>Email</label>
        <input type="email" name="from_name" required />
        <label>Message</label>
        <textarea name="message" required />
        <label>Attach file:</label>
        <input type="file" name="my_file" />
        <input type="submit" value="Send" />
      </form>
      {message && <p>{message}</p>}
    </StyledContactForm>
  );
};

const StyledContactForm = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;

    label {
      margin-top: 1rem;
    }

    input[type="text"],
    input[type="email"],
    textarea {
      padding: 0.5rem;
      margin-top: 0.5rem;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    input[type="file"] {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
      padding: 0.5rem;
    }
  }

  h1 {
    color: blue;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
  }

  p {
    text-align: center;
    margin-top: 1rem;
    color: green;
  }
`;

export default Contact;