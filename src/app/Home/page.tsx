"use client"
import React, {useEffect} from "react"
import { Util } from "../../utils/utils"
import { useRouter } from 'next/navigation';
import Header from '../../components/Header'

export default function Home() {
    const util = new Util();
    const router = useRouter();
    useEffect(() => {
        if(!util.isAutenticated()){
            router.push('/Login');
        }
    })
    return (
        <Header/>
    )
}