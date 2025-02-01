const Filter = ({filter, setter, changeHandler}) => {
    return (
        <>
            filter shown with <input value={filter} onChange={(e) => changeHandler(e, setter)} />
        </>
    )
}

export default Filter