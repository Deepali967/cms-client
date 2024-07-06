import React, { useEffect, useState } from "react";
import { FORM_FIELDS } from "../../assets/constants/app-constants";
import './add-section.scss';


const AddSectionForm = (props) =>
{

    const [formField, setFields] = useState(FORM_FIELDS)
    const [showErrors, setShowErrors] = useState(false);
    const [errorObj, setErrorObj] = useState({});

    const clearFields = () =>
    { 
        Object.keys(formField).map((field) =>
        {
            let fCurrentValue = formField[field];
            setFields(values => ({ ...values, [field]: { ...fCurrentValue, value: "" } }));
        })
    }


    const submitData = () =>
    { 
        let errorKeys = Object.keys(errorObj).filter((key) => errorObj[key] !== "");

        if (errorKeys.length)
        {
            setShowErrors(true);
            return;
        }
    }

    const handleChange = (e) =>
    {
        if (showErrors)
        {
            setShowErrors(false);
        }

        const name = e.target.name;
        const value = e.target.value;
        const fCurrentValue = formField[name];

        setFields(values => ({ ...values, [name]: { ...fCurrentValue, value: value } }));

        validateuserInput(name, value);
    }


    const validateuserInput = (field, userValue) =>
    {

        if (userValue.trim().length)
        {
            setErrorObj(
                Object.assign(errorObj, {
                    [field]: "",
                })
            );
        } else
        {
            setErrorObj(
                Object.assign(errorObj, {
                    [field]: "Field is Required",
                })
            );
        }
    };

    
    const renderForm = () =>
    { 
        return Object.keys(formField).map((field) =>
        {
            return (
                <React.Fragment>
                <div className="form-group" key={field}>
                        <label htmlFor={formField[field]?.id}>{formField[field]?.label}</label>

                        <div className="input-value">
                            {formField[field]?.type === 'file' ? (
                        <input type={formField[field]?.type} id={formField[field]?.id} accept=".png" className="form-control-file" />
                    ) : (
                            <input type={formField[field]?.type} name={field} value={formField[field]?.value} onChange={(e)=>handleChange(e)} id={formField[field]?.id} className="form-control" />
                            )}
                            
                    {showErrors && <div className="error">{errorObj[field]}</div>}
                        </div>
                    
                </div>
                    </React.Fragment> 
            );
           
        })
    }

    useEffect(() =>
    { 
        Object.keys(formField).map((field) =>
        { 
            setErrorObj((values) => ({ ...values, [field]: 'Field is Required' }));
        })
    },[])

    return (
        <div className="add-section-form" onClick={() => { props.close()}}>
            <form className="form-section">
                {renderForm()}
                <div className="action">
                    <div onClick={()=>clearFields()} className="btn btn-primary clear">Clear</div>
                    <div onClick={()=> submitData()} className="btn btn-primary submit">Submit</div>
                </div>

            </form>
        </div>
    );

}


export default AddSectionForm;