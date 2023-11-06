"use client"
import api from '../../services/api';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Util } from '../../utils/utils'
import { useRouter } from 'next/navigation';
import { FaEye } from 'react-icons/fa';
import LogoMinimalist from '../../assets/logo_minimalist.svg';
import LoginPageImage from '../../assets/login_page_image.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passworInputType, setPasswordInputType] = useState('password');
  const util = new Util();

  const handleChageEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handleChagePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const saveLogin = (user_id: string, token_key: string) => {
    localStorage.setItem('@plataformaCursos/USER_ID', user_id);
    localStorage.setItem("@plataformaCursos/TOKEN_KEY", token_key);
    router.push('/Home');
  }

  const validateLoginData = (): Boolean => {
    if (email.length == 0 || email == null) {
      toast.error('O email é obrigatório');
      return false
    } else if (password.length == 0 || password == null) {
      toast.error('A senha é obrigatória')
      return false
    } else if (!util.validateEmail(email)) {
      toast.error('Email inválido, tente um email com o formato (exemplo@email.com)')
      return false
    }
    return true
  }

  const showPassword = () => {
    if (passworInputType == 'password') {
      setPasswordInputType('text');
    } else {
      setPasswordInputType('password');
    }
  }

  const callLoginApiRoute = async () => {
    if (validateLoginData()) {
      await api.post('/login', {
        email: email,
        password: password
      })
        .then(response => {
          saveLogin(response.data.user_id, response.data.token);
        }).catch(err => {
          toast.error(err.response.data.error);
        });
    }
  }

  return (
    <div className="grid grid-cols-3 h-screen bg-dark-blue p-2">
      <div className='min-h-full col-span-2 flex items-center justify-center'>
        <Image src={LoginPageImage} alt={'Imagem lápis sorridente'} width={600} height={600} />
      </div>
      <div className='h-full bg-white rounded-lg grid grid-flow-row place-content-center'>
        <ToastContainer />
        <div className='pb-10 grid grid-flow-row justify-items-center'>
          <Image src={LogoMinimalist} alt={'Logo'} />
          <h1 className='text-black font-bold text-3xl text-center'>Bem vindo de volta!</h1>
          <h2 className='text-gray-500 text-center text-sm'>Porfavor insira seus dados de login</h2>
        </div>
        <input type="text" value={email} onChange={handleChageEmail} placeholder="Email" />
        <div className="relative mb-6 mt-6">
          <input type={passworInputType} value={password} onChange={handleChagePassword} placeholder="Password" />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 cursor-pointer" onClick={showPassword}>
            <FaEye color="rgb(156 163 175)" />
          </div>
        </div>
        <div className='grid grid-cols-1'>
          <Link href='#' className='text-gray-500 text-sm text-right'>Esqueceu a senha?</Link>
        </div>
        <button className="bg-purple-500 text-white hover:bg-purple-400 font-bold px-6 py-2 mt-6 rounded-3xl" onClick={callLoginApiRoute}>Login</button>
        <div className='grid grid-cols-1 p-2'>
          <Link href='#' className='text-gray-500 text-sm text-center'>Não tem uma conta? Cadastre-se</Link>
        </div>
      </div>
    </div>
  )
}
