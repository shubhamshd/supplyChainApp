import "../styles/Form.css";

export default function Product ({ product, handleChange, addProduct}){
    // console.log(rowsData);

    const validate = () => {
        if(product._ownerId && product._modelNumber && product._partNumber && product._serialNumber && product._productCost){
            return product._ownerId.length && product._modelNumber.length && product._partNumber.length && product._serialNumber.length && product._productCost.length;  
        }
        else{
            return 0;
        }
    };
    return(
        <div>
            {/* Add New Product */}
            {/* <button onClick={handleAddProductVisibility}>
            </button> */}
            <h3> Add a new Product? </h3>
            <div className="form-box">
                <form onSubmit={addProduct}>
                    <label>
                    <input 
                        type = "number"
                        placeholder = "Owner Id"
                        name="_ownerId"
                        value={product._ownerId}
                        onChange={handleChange}
                    />
                    </label>

                    <label>
                    <input 
                        type = "text"
                        placeholder = "Model Number"
                        name="_modelNumber"
                        value={product._modelNumber}
                        onChange={handleChange}
                    />
                    </label>

                    <label>
                    <input 
                        type = "text"
                        placeholder = "Part Number"
                        name="_partNumber"
                        value={product._partNumber}
                        onChange={handleChange}
                    />
                    </label>

                    <label>
                    <input 
                        type = "text"
                        placeholder = "Serial Number"
                        name="_serialNumber"
                        value={product._serialNumber}
                        onChange={handleChange}
                    />
                    </label>

                    <label>
                    <input 
                        type = "number"
                        placeholder = "Product Cost"
                        name="_productCost"
                        value={product._productCost}
                        onChange={handleChange}
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