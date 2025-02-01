import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notifcation, setNotifaction] = useState(null);

  useEffect(() => {
    personsService.getPersons().then((person) => {
      setPersons(person);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    let foundPerson = persons.find(
      (person) =>
        person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    );
    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .updatePerson(foundPerson.id, foundPerson.name, newNumber)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );

            const newNotifaction = {
              message: `Replaced ${foundPerson.name} number from ${foundPerson.number} to ${updatedPerson.number}`,
              warning: false,
            };
            setNotifaction(newNotifaction);
            setTimeout(() => setNotifaction(null), 5000);
          })
          .catch((error) => {
            const errorMessage = error.response.data.message;
            let newNotifaction = {
              message: errorMessage,
              warning: true,
            };
            setNotifaction(newNotifaction);
            setTimeout(() => setNotifaction(null), 5000);
          });
      }
      return;
    }

    const person = {
      name: newName,
      number: newNumber,
    };

    personsService
      .postPerson(person)
      .then((personData) => {
        setPersons(persons.concat(personData));

        const newNotifaction = {
          message: `Added ${person.name}`,
          warning: false,
        };

        setNotifaction(newNotifaction);
        setTimeout(() => setNotifaction(null), 5000);
        setNewNumber("");
        setNewName("");
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        const newNotifaction = {
          message: errorMessage,
          warning: true,
        };
        setNotifaction(newNotifaction);
        setTimeout(() => setNotifaction(null), 5000);
      });
  };

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const deletePerson = (personId) => {
    const personName = persons.find((person) => person.id === personId).name;
    if (window.confirm(`Delete ${personName}?`)) {
      personsService.deletePerson(personId).then(() => {
        setPersons(persons.filter((person) => person.id !== personId));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notifcation={notifcation} />

      <Filter
        filter={newFilter}
        setter={setNewFilter}
        changeHandler={handleInputChange}
      />

      <PersonForm
        onSubmit={addPerson}
        changeHandler={handleInputChange}
        name={newName}
        number={newNumber}
        filter={newFilter}
        nameSetter={setNewName}
        numberSetter={setNewNumber}
      />

      <Persons
        filter={newFilter}
        persons={persons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
