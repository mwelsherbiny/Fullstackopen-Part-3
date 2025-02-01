const Persons = ({filter, persons, deletePerson}) => {
    const displayedPersons = filter?
        persons.filter(person => person.name.trim().toLowerCase().includes(filter.trim().toLowerCase())) :
        persons
    return (
        <>
            <h2>Numbers</h2>
            {
                displayedPersons.map(person => {
                    return (
                        <div key={person.name}>
                            <span>{person.name} {person.number} </span>
                            <button onClick={() => deletePerson(person.id)}>delete</button>
                        </div>
                    )
                })
            }
            
        </>
    )
}

export default Persons
