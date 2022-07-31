import React, { useState, useEffect } from 'react'
import { FaToggleOn, FaToggleOff } from 'react-icons/fa'
//import { FaToggleOff } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { setFromCurrrency, setToCurrrency } from './converterSlice'
import Options from './Options'

const Converter = () => {
  const fromCurrency = useSelector((state) => state.converter.fromCurrency)
  const toCurrency = useSelector((state) => state.converter.toCurrency)
  const [show, setShow] = useState(true)

  const dispatch = useDispatch()

  const [fromAmount, setFromAmount] = useState(0)
  const [toAmount, setToAmount] = useState(0)

  const [rate, setRate] = useState(0)

  const darkMode = () => {
    setShow(!show)
    console.log('clicked')
  }
  async function fetchRate() {
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/6a79c46b101e1629c0661503/pair/${fromCurrency}/${toCurrency}`,
      )

      const data = await res.json()
      const rateData = await data.conversion_rate
      console.log(await rateData, await data)
      setRate(await rateData)
      setToAmount(fromAmount * (await rateData))
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    fetchRate()
  }, [fromCurrency, toCurrency])

  return (
    <div>
      <section
        className={show ? 'converter-container' : 'light-converter-container'}
      >
        <div className={show ? 'converter-wrapper' : 'light-converter-wrapper'}>
          <div className="header-container">
            <h2>CURRENCY CONVERTER</h2>

            <div onClick={darkMode}>
              {show ? <FaToggleOn size={35} /> : <FaToggleOff size={35} />}
            </div>
            {/* <FaToggleOff size={35} /> */}
          </div>
          <div className="divider">
            <hr />
          </div>

          <div className="from-amount-container">
            <input
              className={show ? 'from-amount' : 'light-from-amount'}
              type="number"
              placeholder="Enter an amount"
              value={fromAmount}
              onChange={(e) => {
                setFromAmount(e.target.value)
                setToAmount(Number(e.target.value) * rate)
              }}
            />
            <select
              className={
                show ? 'from-amount-select' : 'light-from-amount-select'
              }
              id="currency"
              name="currency"
              onChange={(e) => {
                e.preventDefault()
                dispatch(setFromCurrrency(e.target.value))
              }}
            >
              <Options />
            </select>
          </div>
          <div className="to-amount-container">
            <input
              className={show ? 'to-amount' : 'light-to-amount'}
              type="number"
              placeholder="Enter an amount"
              value={toAmount}
              onChange={(e) => {
                setToAmount(e.target.value)
                setFromAmount(Number(e.target.value) / rate)
                console.log(toAmount)
              }}
            />
            <select
              className={show ? 'to-amount-select' : 'light-to-amount-select'}
              id="currency"
              name="currency"
              defaultValue={'default'}
              onChange={(e) => {
                e.preventDefault()
                dispatch(setToCurrrency(e.target.value))
              }}
            >
              <Options />
            </select>
          </div>
          <div className="rate">
            <h4>Exchange Rate = {rate}</h4>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Converter
