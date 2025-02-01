const Notification = ({notifcation}) => {
    if (notifcation == null) return null

    const notifactionStyle = {
        color: notifcation.warning? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
        <div style={notifactionStyle}>
            {notifcation.message}
        </div>
    )
}

export default Notification