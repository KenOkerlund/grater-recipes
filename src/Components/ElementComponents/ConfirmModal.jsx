import './ConfirmModal.css'

const ConfirmModal = (props) => {

    const handleBackdropClick = (e) => {
        if(e.currentTarget === e.target){
            props.onCancel();
        };
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="confirm-modal">
                <div className="modal-header">
                    <h2 className="modal-header-content">Deleting Recipe</h2>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete {props.recipeTitle}?</p>
                    <div className="modal-actions">
                        <button className="modal-cancel-button" onClick={props.onCancel} >Cancel</button>
                        <button className="modal-confirm-button" onClick={props.onDelete} >Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;