import { useState, useEffect } from 'react';

const Converter = () => {
    const [exchange, setExchange] = useState("")
    const [currency, setCurrency] = useState([])
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [amount, setAmount] = useState("")


    const fetchExchange = async () => {
        const res = await fetch('https://api.exchangerate.host/symbols')
        const data = await res.json()
        setCurrency(data.symbols)
    }

    const convertCurrency = async () => {
        const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}`)
        const data = await res.json()
        setExchange(data.result)
    }

    useEffect(() => {
        fetchExchange();
    }, [])

    const result = Object.keys(currency).map(function (key) {
        return { name: currency[key].code, desc: currency[key].description };
    });
    return (
        <div className='bg-dark text-white pb-5 p-3'>
            <div className='d-flex justify-content-center py-3'>
                <h1 className='display-1'>{exchange * amount} {to}</h1>
            </div>

            <div className='d-flex justify-content-between container'>

                <div className=''>
                    <p>Amount</p>
                    <input placeholder='enter amount' className='form-control form-control-lg bg-dark text-white border-warning' type="text" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                </div>


                <div className=''>
                    <p> From </p>
                    <select className="form-select form-select-lg bg-dark text-white border-warning" aria-label=".form-select-lg example" value={from} onChange={(e) => setFrom(e.target.value)}>
                        <option>Select Currency </option>
                        {result.map((curr, index) => {
                            return (
                                <option key={index} value={curr.name}> {curr.name} , {curr.desc} </option>
                            )
                        })}
                    </select>
                </div>

                <div className=''>
                    <p> To </p>
                    <select className="form-select form-select-lg bg-dark text-white border-warning" aria-label=".form-select-lg example" value={to} onChange={(e) => setTo(e.target.value)}>
                        <option > Select Currency </option>
                        {result.map((curr, index) => {
                            return (
                                <option key={index} value={curr.name}> {curr.name}, {curr.desc} </option>
                            )
                        })}
                    </select>
                </div>

            </div>

            <div className='d-flex justify-content-center mt-5'>
                <button className='btn btn-lg btn-warning px-4' onClick={convertCurrency}> Convert </button>
            </div>
        </div>
    )
}

export default Converter