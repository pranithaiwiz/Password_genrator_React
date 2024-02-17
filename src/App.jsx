import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [num, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //use REF
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (setnumAllowed) str += "0123456789"
    if (setcharAllowed) str += "!@#$%^&*()_+=-~`':;,<.>/?{][}"
    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
      setPassword(pass)
    }}, [length,num,charAllowed])

    const copyToClipboard = useCallback(() => {
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password)}, [password])

    useEffect( () => {
      passwordGenerator()
    }, [length, num, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3' 
          placeholder='Password' readOnly/>
          <button onClick={copyToClipboard} className='outline-none text-white px-3 py-0.5 shrink-0 cursor-pointer  active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-900 to-purple-500 border-purple-'>COPY</button>
        </div>
        <div className='flex text-sm gap-x-2'>
        <input type="range" min={6} max={50} value={length} className='cursor-pointer '
            onChange={(e) => {setLength(e.target.value)}}/>
            <label>Label: {length}</label>
          <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={num} id="numberInput" onChange={() => {
              setnumAllowed((prev) => !prev);
            }}/>
             <label htmlFor="numberInput">Number</label>
            <input type="checkbox" defaultChecked={num} id="characterInput" onChange={() => {
              setnumAllowed((prev) => !prev);
            }}/>
             <label htmlFor="characterInput">Characters</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
