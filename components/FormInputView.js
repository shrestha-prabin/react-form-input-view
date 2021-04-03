import { useEffect, useState } from "react"
import styles from '../styles/form.module.css';

export default function FormInputView({
    name,
    displayName,
    value,
    placeholder,
    error,
    inputType,
    onValueChange,
    onFileSelect,
    ...other
}) {

    const [characterSet, setCharacterSet] = useState(null)

    useEffect(() => {
        switch (inputType) {
            case INPUT_TYPE.number:
                setCharacterSet('0123456789')
                break;
            default:
                break;
        }
    }, [inputType])


    const handleValueChange = (e) => {
        let newValue = e.target.value
        // Only allow characters defined in characterSet
        if (characterSet) {
            let characterSetArray = characterSet.split('')
            for (const c of newValue) {
                if (!characterSetArray.includes(c)) {
                    newValue = newValue.replace(c, '')
                }
            }
        }
        onValueChange(name, newValue)
    }

    const handleFileChange = (e) => {

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;

        let file = files[0]
        console.log(file.name);

        let reader = new FileReader();
        reader.onload = (e) => {
            onValueChange(name, e.target.result)
        }
        reader.readAsDataURL(file);
        onFileSelect(name, file);
    }

    const renderInput = () => {
        if (inputType === INPUT_TYPE.file) {
            return <div>
                <input type='file' onChange={handleFileChange} />
                {
                    value && (
                        <div>
                            <img  style={{ height: 200, width: 200, objectFit: 'contain' }} src={value} />
                        </div>
                    )
                }
            </div>
        } else {
            return <input
                className={styles.input}
                value={value}
                placeholder={placeholder}
                onChange={handleValueChange}
                {...other}
            />
        }

    }
    return (
        <div>
            <div>{displayName}</div>
            {renderInput()}
            <div>{error}</div>
        </div>
    )
}

const INPUT_TYPE = {
    text: 'text',
    number: 'number',
    file: 'file',
}

export { INPUT_TYPE }
