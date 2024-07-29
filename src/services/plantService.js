const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/plantList`

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const show = async (plantId) => {
  try {
    const res = await fetch(`${BASE_URL}/${plantId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const create = async (plantFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantFormData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const deletePlant = async (plantId) => {
  try {
    const res = await fetch(`${BASE_URL}/${plantId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export { index, show, create, deletePlant }
