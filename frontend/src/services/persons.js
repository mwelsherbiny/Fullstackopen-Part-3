import axios from "axios";

const url = "/api/persons";

const getPersons = () => {
  return axios.get(url).then((response) => response.data);
};

const postPerson = (person) => {
  return axios.post(url, person).then((response) => response.data);
};

const deletePerson = (personId) => {
  return axios.delete(`${url}/${personId}`).then((response) => response.data);
};

const updatePerson = (personId, personName, newNumber) => {
  return axios
    .put(`${url}/${personId}`, { name: personName, number: newNumber })
    .then((response) => response.data);
};

export default { getPersons, postPerson, deletePerson, updatePerson };
