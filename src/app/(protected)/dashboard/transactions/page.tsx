"use client"
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/hooks';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface IDebits{
    id: string;
    userId: string;
    sentTo: string;
    amount: number;
    date: string;
}

interface ICredits {
    id: string;
    userId: string;
    receivedFrom: string;
    amount: number;
    date: string;
}

const TransactionsPage = () => {
    const [show, setShow] = React.useState(true);
    const [debits, setDebits] = useState<IDebits[]>([]);
    const [credits, setCredits] = useState<ICredits[]>([]);
    const userState = useAppSelector(state => state.user);
    const [debitSum, setDebitSum] = useState(0);
    const [creditSum, setCreditSum] = useState(0);

    const getDebitSum = () => {
        let sum = 0;
        debits.forEach((debit) => {
            sum += debit.amount;
        })
        setDebitSum(sum);
    }

    const getCreditSum = () => {
        let sum = 0;
        credits.forEach((credit) => {
            sum += credit.amount;
        })
        setCreditSum(sum);
    }

    const handleCredits = () => {
        setShow(false);
        if(creditSum != 0) return;
        axios.post("/api/txn/getcredits", { id: userState.id })
            .then(res => {
                setCredits(res.data.body.data);
            })
    }


    useEffect(() => {
        axios.post("/api/txn/getdebits", { id: userState.id })
            .then(res => {
                if (res.data.status === 200) {
                    setDebits(res.data.body.data);
                }
            })
    }, [userState.id]);

    useEffect(() => {
        getDebitSum();
        getCreditSum();
    }, [debits, credits]);

    return (
        <>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex space-x-6 p-10'>
                    <Button onClick={() => setShow(true)} variant={show === true ? 'outline' : 'default'}>Debits</Button>
                    <Button onClick={handleCredits} variant={show === false ? 'outline' : 'default'}>Credits</Button>
                </div>
                {show && <div>
                    <h1 className='text-2xl font-bold'>Debits</h1>
                    <p>Total contributions made: {debits.length || 0}</p>
                    <p>Total payment made: {debitSum}</p>
                </div>}
                {!show && <div>
                    <h1 className='text-2xl font-bold'>Credits</h1>
                    <p>Total contributions received: {credits.length || 0}</p>
                    <p>Total payment received: {creditSum} </p>
                </div>}
            </div>
        </>
    )
}

export default TransactionsPage