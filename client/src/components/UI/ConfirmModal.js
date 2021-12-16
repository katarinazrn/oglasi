const ConfirmModal = props => {

    return (
        <div className="modal" id='modal' tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.message}
                        {props.id}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={props.action} data-dismiss="modal">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;