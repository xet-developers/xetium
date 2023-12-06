export const UserData = ({users}) => {
    const a = [];
    users.map((currentUser) => {
        for (let key in currentUser) {
            a.push((
                <tr>
                <td>1</td>
                <td>{key}</td>
                <td>{currentUser[key]}</td>
            </tr>))
        }
    })

    return (
        a.map(b => b)
    )
}