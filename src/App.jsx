import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react'

export default function App() {

  const [inputValue, setInputValue] = useState('')

  const [tasks, setTasks] = useState([])

  const [concludedsTasks, setConcludedsTasks] = useState([])
  const [pendingTasks, setPendingTasks] = useState([])

  const [typeTasks, setTypesTasks] = useState('todas')

  function toggleTypeTasks(value) {
    setTypesTasks(value)
  }

  function addTask(e) {
    e.preventDefault()

    if(inputValue == ""){
      notifyError()
      return
    }

    setTasks((tasks) => [...tasks, {
      id: Math.floor(Math.random() * 9999999),
      name: inputValue,
      concluded: false,
    }])

    setInputValue('')
    
    notifySuccess()
  }

  function toggleTaskFinalized(id){
    const updatedItem = tasks.map(item => 
      item.id === id ? { ...item, concluded: !item.concluded } : item
    )

    setTasks(updatedItem)
  }

  function formatterWord(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  useEffect(() => {
    const tasksConcluded = tasks.filter(task => task.concluded == true)
    const tasksPending = tasks.filter(task => task.concluded == false)

    setConcludedsTasks(tasksConcluded)
    setPendingTasks(tasksPending)

  },[tasks, concludedsTasks, pendingTasks, typeTasks])

  const notifyError = () => toast.error("Não podemos adicionar uma tarefa em branco");
  const notifySuccess = () => toast.success("Tarefa adicionada com sucesso");

  return (
    <div className={`w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-my-quartenary`}>

      <div className={`w-[350px] bg-my-secondary px-2 py-3 rounded-[6px]`}>
        
        <form
          className='w-full flex'
          onSubmit={(e) => addTask(e)}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Escreva um tarefa'
            className={`flex-grow-[1] bg-my-quartenary outline-none mr-1 rounded-tl-[6px] rounded-bl-[6px] ps-2 py-1 text-[14px] capitalize`}
          />
          <input type="submit" value="enviar"
            className={`outline-none px-3 uppercase transition-all duration-[.4s] cursor-pointer border-[1px] border-transparent bg-my-terciary text-my-quartenary rounded-tr-[6px] rounded-br-[6px] text-[14px]
            hover:bg-my-secondary hover:text-my-terciary hover:border-my-terciary focus:bg-my-secondary focus:text-my-terciary focus:border-my-terciary`}
          />
        </form>

        <div className='w-full flex justify-between mt-2 text-my-quartenary mb-2 uppercase text-[12px]'>
          <div className={`cursor-pointer py-1 rounded-tl-[6px] rounded-bl-[6px] ${typeTasks == 'todas' ? 'bg-my-terciary' : 'bg-transparent'} w-[33.33%] text-center`} onClick={() => toggleTypeTasks('todas')}>todas</div>
          <div className={`cursor-pointer py-1 ${typeTasks == 'concluidas' ? 'bg-my-terciary' : 'bg-transparent'} w-[33.33%] text-center`} onClick={() => toggleTypeTasks('concluidas')}>concluidas</div>
          <div className={`cursor-pointer py-1 rounded-tr-[6px] rounded-br-[6px] ${typeTasks == 'pendentes' ? 'bg-my-terciary' : 'bg-transparent'} w-[33.33%] text-center`} onClick={() => toggleTypeTasks('pendentes')}>pendentes</div>
        </div>

        <div className='w-full h-[2px] bg-my-terciary'></div>

        {typeTasks == 'todas' && tasks.map((task) => (
          <div className={`flex justify-between items-center text-my-quartenary bg-my-primary px-2 py-2 font-medium mb-2 rounded-[6px]`}>
            <p>{formatterWord(task.name)}</p>
            <div
              onClick={() => toggleTaskFinalized(task.id)}
              className={`transition-all duration-[.4s] cursor-pointer w-[14px] h-[14px] rounded-[50%] ${task.concluded == true ? 'bg-[#58e19a]' : 'bg-[#f55d2f]'}`}
            />
          </div>
        ))}
        
        {typeTasks == 'todas' && tasks.length == 0 && (
          <p className='ps-2 text-left text-my-quartenary'>Você não adicionou nenhuma tarefa ainda</p>
        )}
        
        {typeTasks == 'concluidas' && concludedsTasks.map((task) => (
          <div className={`flex justify-between items-center text-my-quartenary bg-my-primary px-2 py-2 font-medium mb-2 rounded-[6px]`}>
            <p>{formatterWord(task.name)}</p>
            <div
              onClick={() => toggleTaskFinalized(task.id)}
              className={`transition-all duration-[.4s] cursor-pointer w-[14px] h-[14px] rounded-[50%] ${task.concluded == true ? 'bg-[#58e19a]' : 'bg-[#f55d2f]'}`}
            />
          </div>
        ))}

        {typeTasks == 'concluidas' && concludedsTasks.length == 0 && (
          <p className='ps-2 text-left text-my-quartenary'>Você não terminou nenhuma tarefa ainda</p>
        )}
        
        {typeTasks == 'pendentes' && pendingTasks.map((task) => (
          <div className={`flex justify-between items-center text-my-quartenary bg-my-primary px-2 py-2 font-medium mb-2 rounded-[6px]`}>
            <p>{formatterWord(task.name)}</p>
            <div
              onClick={() => toggleTaskFinalized(task.id)}
              className={`transition-all duration-[.4s] cursor-pointer w-[14px] h-[14px] rounded-[50%] ${task.concluded == true ? 'bg-[#58e19a]' : 'bg-[#f55d2f]'}`}
            />
          </div>
        ))}

        {typeTasks == 'pendentes' && pendingTasks.length == 0 && (
          <p className='ps-2 text-left text-my-quartenary'>Você não tem nenhuma tarefa pendente</p>
        )}

      </div>
      
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
      />

    </div>
  )
}
