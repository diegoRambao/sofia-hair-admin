import { useEffect, useState } from 'react'
import './App.css'
import { create, getAll, deleteProduct, update } from './product.service'

function App() {
   const [form, setForm] = useState({})
   const [products, setFroducts] = useState([])

   useEffect(() => {
      getAll().then((res) => {
         setFroducts(res)
      })
   }, [])

   const handleSubmit = (event) => {
      event.preventDefault()
      setForm((prev) => ({ ...prev, price: parseFloat(form.price) }))
      if (!form.id) {
         create(form).then((res) => {
            setFroducts((prev) => [...prev, res])
            setForm({})
            window.alert('Product Guardado con exito')
         })
      } else {
         update(form.id, form).then((res) => {
            const updateProduct = products.map((item) => (item.id === form.id ? form : item))
            setFroducts(updateProduct)
            setForm({})
            window.alert('Product Actualizado con exito')
         })
      }
   }

   const handleChange = (event) => {
      const value = event.target.value
      setForm({ ...form, [event.target.name]: value })
   }

   const handleDelete = ({ name, id }) => {
      const value = window.confirm(`Deseas eliminar el product ${name}`)
      if (value) {
         deleteProduct(id).then((res) => {
            setFroducts((prev) => prev.filter((item) => item.id !== id))
         })
      }
   }

   return (
      <div className="container">
         <h1 className="text-center my-5">Productos</h1>
         <div className="row">
            <div className="col-md-8">
               <table className="table table-bordered">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                     </tr>
                  </thead>
                  <tbody>
                     {products.map((product, index) => (
                        <tr key={product.id}>
                           <td>{index + 1}</td>
                           <td>{product.name}</td>
                           <td>
                              <img src={product.imgUrl} alt={product.name} style={{ width: '60px' }} />
                           </td>
                           <td>$ {product.price}</td>
                           <td className="ml-2">
                              <button onClick={() => setForm(product)} className="btn btn-primary btn-sm mx-2">
                                 Editar
                              </button>
                              <button onClick={() => handleDelete(product)} className="btn btn-danger btn-sm">
                                 Eliminar
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="col-md-4">
               <h5>Nuevo producto</h5>
               <form onSubmit={handleSubmit}>
                  <input
                     type="text"
                     name="name"
                     className="form-control mb-2"
                     placeholder="Nombre"
                     value={form.name || ''}
                     onChange={handleChange}
                  />
                  <textarea
                     name="description"
                     placeholder="Descripcion"
                     className="form-control mb-2"
                     value={form.description || ''}
                     onChange={handleChange}
                  ></textarea>
                  <input
                     type="number"
                     name="price"
                     className="form-control mb-2"
                     placeholder="Precio"
                     value={form.price || ''}
                     onChange={handleChange}
                  />
                  <input
                     type="text"
                     name="imgUrl"
                     className="form-control mb-2"
                     placeholder="Imagen"
                     value={form.imgUrl || ''}
                     onChange={handleChange}
                  />
                  <button type="submit" className="btn btn-success me-2">
                     Guardar
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setForm({})}>
                     Cancelar
                  </button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default App
