
const ProgressDisplay = ({ progress }: any) => {
    return (
        <div>
            <h4>Upload Progress:</h4>
            <pre>{progress}</pre> 
        </div>
    );
};

export default ProgressDisplay;
