const LoadingModal = () => {
    return (
        <div className="modal-backdrop">
            <div className="confirm-modal">
                <div className="modal-header">
                    <h2 className="modal-header-content">Loading...</h2>
                </div>
                <div className="modal-body">
                    <p>Loading content, please wait.</p>
                </div>
            </div>
        </div>
    )
}

export default LoadingModal;