import { argv } from 'node:process';
import { promises as fs } from 'fs';

const arrDatos =[]
const  obtenerDatos =async ()=>{
  await fs.readFile('datos.json')
  .then((datos)=>{
    arrDatos.push(...JSON.parse(datos ))
  
  })
  .catch(err=>{})
}


await obtenerDatos()


const guardarDatos =()=>{
  fs.writeFile('datos.json',JSON.stringify(arrDatos), 'utf8', (err)=>{
    console.log(err);
    
  });
}

const nuevaTarea =(description)=>{
  const fecha = new Date()
  const ref =  arrDatos[arrDatos.length-1]
  const idCorrelativo = ref ?  ref.id+1 :1

  arrDatos.push({
    id:idCorrelativo,
    description,
    status:'todo',
    createdAt:fecha,
    updatedAt : fecha
  })

}

const editarTarea =(id,descripcion)=>{  
  const tarea =arrDatos.find(datos=>datos.id == id)
  if (!tarea) return console.log(`La tarea con  id: ${id} no existe`);
  tarea.description = descripcion
  tarea.updatedAt = new Date()
  

}

const cambiarStatus =(id,estado)=>{
  const tarea =arrDatos.find(datos=>datos.id == id)
  if (!tarea) return console.log(`La tarea con  id: ${id} no existe`);

  if ((estado == 'progress' || estado == 'done') && tarea.status == 'deleted')  return  console.log(`La tarea con id: ${id} no existe`);
  if (estado == 'done' && tarea.status == 'todo')  return console.log(`La tarea con id: ${id} no esta en proceso todavia`);
  if (estado == 'progress' && tarea.status == 'done')  return console.log(`La tarea con id: ${id} ya esta terminada`);

  tarea.status = estado
}

const listarTarea =(tipo='')=>{

  switch (tipo) {
    case '':
      const todos = arrDatos.filter(dato=>dato.status !='deleted')
     for (let index = 0; index < todos.length; index++) {
      const dato = todos[index]
      console.log(`${index+1}.- id : ${dato.id}, descripcion : ${dato.description}, estado: ${dato.status} `);
     }

      break;
    case 'done':
      const terminados = arrDatos.filter(dato=>dato.status =='done')
      for (let index = 0; index < terminados.length; index++) {
        const dato = terminados[index]
        console.log(`${index+1}.- id : ${dato.id}, descripcion : ${dato.description}, estado: ${dato.status} `);
       }
      break;
    case 'todo':
      const pendientes = arrDatos.filter(dato=>dato.status =='todo')
      for (let index = 0; index < pendientes.length; index++) {
        const dato = pendientes[index]
        console.log(`${index+1}.- id : ${dato.id}, descripcion : ${dato.description}, estado: ${dato.status} `);
       }
      break;
    case 'in-progress':
      const proceso = arrDatos.filter(dato=>dato.status =='progress')
      for (let index = 0; index < proceso.length; index++) {
        const dato = proceso[index]
        console.log(`${index+1}.- id : ${dato.id}, descripcion : ${dato.description}, estado: ${dato.status} `);
       }
      break;
    case 'deleted':
      const borrados = arrDatos.filter(dato=>dato.status =='deleted')
      for (let index = 0; index < borrados.length; index++) {
        const dato = borrados[index]
        console.log(`${index+1}.- id : ${dato.id}, descripcion : ${dato.description}, estado: ${dato.status} `);
       }
      break;
  
    default:
      console.log('No existe ese estado');
      break;
  }


}

const argumentos = argv.slice(2)

switch (argumentos[0]) {
  case 'add':
    nuevaTarea(argumentos[1] )
    break;
  case 'update':
    editarTarea(argumentos[1],argumentos[2])
    break;
  case 'delete':
    cambiarStatus(argumentos[1],'deleted')
    break;
  case 'mark-in-progress':
    cambiarStatus(argumentos[1],'progress')
    break;
  case 'mark-done':
    cambiarStatus(argumentos[1],'done')
    break;
  case 'list':
    listarTarea(argumentos[1])
    break;

  default:
    console.log('no existe ese argumento');
    
    break;
}



guardarDatos()



