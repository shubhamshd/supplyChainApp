import { useState } from "react";
import "../styles/Form.css";

export default function Product ({ owner, handleOwnerChange, changeOwnership}){
    // console.log(rowsData);

    return(
        <div>
            {/* Change Ownership form */}
            {/* <button onClick={handleOnwnershipChange}>
            </button> */}
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
                        type="submit"> 
                        Submit 
                    </button>
                </form>
            </div>
            <hr/>
        </div>
    );
}