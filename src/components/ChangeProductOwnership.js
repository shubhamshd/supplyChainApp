import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../styles/Form.css";

export default function ChangeProductOwnership ({ owner, handleOwnerChange, changeOwnership}){
    // console.log(rowsData);

    const validate = () => {
        if(owner._user1Id && owner._user2Id && owner._prodId){
            return owner._user1Id.length && owner._user2Id.length && owner._prodId.length;  
        }
        else{
            return 0;
        }
    };
    return(
        <div>
            <h3> Change Product Ownership </h3>
            <div className="form-box">
                <form onSubmit={changeOwnership}>
                    <label>
                    <input 
                        type = "number"
                        placeholder="Current Owner"
                        name="_user1Id"
                        value={owner._user1Id}
                        onChange={handleOwnerChange}
                    />
                    </label>

                    <label>
                    <input 
                        type = "number"
                        placeholder="New Owner"
                        name="_user2Id"
                        value={owner._user2Id}
                        onChange={handleOwnerChange}
                    />
                    </label>

                    <label>
                    <input 
                        type = "number"
                        placeholder="Product Id"
                        name="_prodId"
                        value={owner._prodId}
                        onChange={handleOwnerChange}
                    />
                    </label>
                    <button  
                        disabled={!validate()}
                        type="submit"> 
                        Submit 
                    </button>
                </form>
            </div>
            <hr/>
        </div>
    );
}