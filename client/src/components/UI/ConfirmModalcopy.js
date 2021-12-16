import { Modal } from 'bootstrap';

const ConfirmModal = props => {

    return (
        <div 
        style={{
            position: 'fixed',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            backgroundColor: 'rgba(0,0,0,0.7)',
            zIndex: '100'
        }}
        onClick={props.cancel}
        >
            <div style={{
                position: 'relative', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)'
            }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <button type="button" className="btn-close" onClick={props.cancel} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {props.message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={props.cancel} >Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={props.action} data-dismiss="modal">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;