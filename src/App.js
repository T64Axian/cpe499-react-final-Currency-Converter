import './App.css';
import './index.css'
import React, { useState, useEffect } from 'react'

function App() {

  // state
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')
  const [visitCount, setVisitCount] = useState(0) // สร้าง state สำหรับเก็บจำนวนผู้เข้าชม

  useEffect(() => {
    // เมื่อหน้าเว็บโหลดให้ตรวจสอบจำนวนครั้งที่เข้าชม
    let count = localStorage.getItem('visitCount')

    if (count) {
      // ถ้ามีข้อมูลอยู่แล้ว เพิ่มค่าอีก 1
      count = parseInt(count) + 1
    } else {
      // ถ้ายังไม่มี ให้ตั้งค่าเป็น 1
      count = 1
    }

    // เก็บค่าใหม่ใน localStorage
    localStorage.setItem('visitCount', count)

    // อัปเดต state
    setVisitCount(count)
  }, []) // ทำงานเพียงครั้งเดียวเมื่อโหลดหน้าเว็บ

  let calcBmi = (event) => {
    // prevent submitting to the server
    event.preventDefault()

    if (!weight && !height) {
      alert('กรุณากรอกน้ำหนักและส่วนสูง')
    } else if (!weight) {
      alert('กรุณากรอกน้ำหนัก')
    } else if (!height) {
      alert('กรุณากรอกส่วนสูง')
    } else {
      // คำนวณ BMI โดยใช้ kg และ m
      let bmi = (weight / ((height / 100) * (height / 100)))
      setBmi(bmi.toFixed(1))

      // Logic for message (ภาษาไทย)
      if (bmi < 18.5) {
        setMessage('คุณมีน้ำหนักน้อยกว่าปกติต้องเพิ่มน้ำหนักอีก')
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setMessage('คุณมีน้ำหนักปกติรักษาน้ำหนักนี้ต้อไป')
      } else if (bmi >= 25 && bmi < 29.9) {
        setMessage('คุณมีน้ำหนักเกินสมควรลดได้แล้ว')
      } else {
        setMessage('คุณเป็นโรคอ้วน โรคอื่นๆ จดชื่อคุณแล้ว')
      }
    }
  }

  let reload = () => {
    window.location.reload()
  }

  return (
    <div className="app">
      <div className='container'>
        <h2 className='center'>เครื่องคำนวณดัชนีมวลกาย (BMI)</h2>
        <form onSubmit={calcBmi}>

          <div>
            <label>น้ำหนัก (กก.)</label>
            <input value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>

          <div>
            <label>ส่วนสูง (ซม.)</label>
            <input value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>

          <div>
            <button className='btn' type='submit'>คำนวณ</button>
            <button className='btn btn-outline' onClick={reload} type='button'>เริ่มใหม่</button>
          </div>
        </form>

        <div className='center'>
          <h3>ค่าดัชนีมวลกายของคุณคือ: {bmi}</h3>
          <p>{message}</p>
        </div>

        
      </div>
      <div className='center'>
          <h4>จำนวนผู้เข้าชม: {visitCount}</h4> {/* แสดงจำนวนผู้เข้าชม */}
      </div>
      <h4>จัดทำโดย : 640416 ชัยวัฒน์ แตวสุขเจริญ</h4>
    </div>
  );
}

export default App;