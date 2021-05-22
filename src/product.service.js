import axios from 'axios'

const ApiUrl = 'https://api-sofia-hair.herokuapp.com/product'

const getAll = async () => {
   const res = await axios.get(ApiUrl)
   return res.data
}

const create = async (product) => {
   const res = await axios.post(ApiUrl, product)
   return res.data
}

const update = async (id, product) => {
   const res = await axios.put(`${ApiUrl}/${id}`, product)
   return res.data
}

const deleteProduct = async (id) => {
   const res = await axios.delete(`${ApiUrl}/${id}`)
   return res.data
}

export { getAll, create, update, deleteProduct }
