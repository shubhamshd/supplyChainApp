import "../styles/Form.css";
import { useState } from "react";

export default function Products ({ rowsData, provenance, getProvenance}){
    // console.log(rowsData);
    var tableHead = ['Product Id', 'Model Number', 'Part Number', 'Serial Number', 'Current Owner', 'Cost', 'Manufacturing Timestamp', ''];
    var provenanceTableHead = ['Owner Id', 'Owner Address', 'Ownership obtained at'];

    const [provenanceTable, setProvenanceTable] = useState(false);

    const handleProvenanceVisibility = () => {
        setProvenanceTable(!provenanceTable);
    }

    const preFetch = (e) => {
        getProvenance(e);
        handleProvenanceVisibility();
    }

    return(
        <div>
            {/* Populate all products */}
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    {tableHead.map(head => <th className="text-center">{head}</th>)}  
                </tr>
                </thead>
                <tbody>
                {rowsData && rowsData.map((item, idx) => (          
                    <tr key={idx}>
                        <td>{item.product_id}</td>
                        <td>{item.modelNumber}</td>
                        <td>{item.partNumber}</td>
                        <td>{item.serialNumber}</td>
                        <td>{item.productOwner}</td>
                        <td>{item.cost}</td>
                        <td>{item.mfgTimeStamp}</td>
                        <td><button value={item.product_id} onClick={(e) => preFetch(e)}> Get Provenance </button></td>
                    </tr>                  
                ))}
                </tbody>
            </table>
            <div>
                {provenance && provenanceTable ?
                    <div>
                        <h1>Provenance details: </h1>
                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                {provenanceTableHead.map(head => <th className="text-center">{head}</th>)}  
                            </tr>
                            </thead>
                            <tbody>
                            {provenance.map((item, idx) => (          
                                <tr key={idx}>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                    <td>{item[3]}</td>
                                </tr>                  
                            ))}
                            </tbody>
                        </table>
                        {/* <h1>Provenance details: </h1>
                        {provenance.map((item, idx) => (
                            <p key={idx}>Owner with id:{item[1]} and address:{item[2]} at time:{item[3]}</p>
                        ))} */}
                    </div>
                : null}
            </div>
        
        </div>
    );
}   