import RoundImage from "../UI/RoundImage";

const EmployersList = props => {

    if (props.employers.length == 0) {
        return (
            <div>
                no
            </div>
        )
    }

    return (
        <div>
            {props.employers.map(e =>
                <div className="card m-3 p-0 rounded-0 shadow-sm">
                    <div className="card-body p-1 ps-3 d-flex">
                        <div style={{ margin: 'auto 0' }}>
                            {console.log(e.imageUrl)}
                            <RoundImage width='100px' src={e.imageUrl ? 'https://localhost:44318/Uploads/'+e.imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/3/3a/M%C3%BCnster%2C_LVM%2C_B%C3%BCrogeb%C3%A4ude_--_2013_--_5149-51.jpg'} />
                        </div>
                        <div className="m-3">
                            <h3 className="me-2">
                                {e.name}
                            </h3>
                            <span className="me-2">
                                {e.address}
                            </span>
                            <span className="me-2">
                                {e.fieldOfWork}
                            </span>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}

export default EmployersList;