import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";
import { login } from "@/lib/api";
import { useIsLogged } from "@/hooks/isLogged"

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useIsLogged('/')

  async function onSubmit(data) {
      try {
          const token = await login(data.email, data.password);

          localStorage.setItem('token', token);
          router.push("/");

      } catch (error) {
          alert('Incorrect Email or Password');
      }
  }

const Form = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[300px] md:w-[600px]'
    >
      {children}
    </form>
  );
};

const Input = ({ label, type = 'text', placeholder, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setIsFilled(!!e.target.value);
  };

  return (
    <div className='relative w-[250px] md:w-[550px] h-[65px]'>
      <label
        className={`absolute text-[#455A64] text-[12px] left-[10px] top-[10px] transition-all duration-200 ${
          isFocused || isFilled ? 'text-blue-500' : ''
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        className={`w-full h-full bg-[#F9F9F9] border border-[#B0BEC5] rounded-md text-[16px] text-[#78909C] px-[10px] pt-[20px] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent ${
          isFocused ? 'bg-blue-50' : ''
        }`}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  );
};

const EmailInput = ({ label, type = 'text', placeholder, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setIsFilled(!!e.target.value);
  };

  const { register } = useForm();

  return (
    <div className='relative w-[250px] md:w-[550px] h-[65px]'>
      <label
        className={`absolute text-[#455A64] text-[12px] left-[10px] top-[10px] transition-all duration-200 ${
          isFocused || isFilled ? 'text-blue-500' : ''
        }`}
      >
        {label}
      </label>
      <input
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Invalida data'
          }
        })}
        type={type}
        className={`w-full h-full bg-[#F9F9F9] border border-[#B0BEC5] rounded-md text-[16px] text-[#78909C] px-[10px] pt-[20px] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent ${
          isFocused ? 'bg-blue-50' : ''
        }`}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  );
};

const PassInput = ({ label, type = 'text', placeholder, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setIsFilled(!!e.target.value);
  };

  const { register } = useForm();

  return (
    <div className='relative w-[250px] md:w-[550px] h-[65px]'>
      <label
        className={`absolute text-[#455A64] text-[12px] left-[10px] top-[10px] transition-all duration-200 ${
          isFocused || isFilled ? 'text-blue-500' : ''
        }`}
      >
        {label}
      </label>
      <input
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
        type={type}
        className={`w-full h-full bg-[#F9F9F9] border border-[#B0BEC5] rounded-md text-[16px] text-[#78909C] px-[10px] pt-[20px] focus:outline-none focus:ring-2 focus:ring-[#B0BEC5] focus:border-transparent ${
          isFocused ? 'bg-blue-50' : ''
        }`}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  );
};

export { Form, Input, EmailInput, PassInput }
