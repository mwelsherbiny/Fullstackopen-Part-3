const PersonForm = ({onSubmit, changeHandler, name, number, nameSetter, numberSetter}) => {
    return (
        <form onSubmit={onSubmit}>
            <h2>Add a new</h2>
            <div>
            name: <input value={name} onChange={(e) => changeHandler(e, nameSetter)} />
            <br></br>
            number: <input value={number} onChange={(e) => changeHandler(e, numberSetter)} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm