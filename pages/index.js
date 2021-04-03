import Head from 'next/head'
import { useState } from 'react'
import FormInputView, { INPUT_TYPE } from '../components/FormInputView'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [formData, setFormData] = useState({
    fullName: { value: '', error: '', required: true },
    mobileNumber: { value: '', error: '', required: true },
    image: { value: '', error: '', required: true },
  })

  const updateFormData = (name, newValue) => {
    setFormData({
      ...formData,
      [name]: {
        value: newValue,
        error: '',
        required: formData[name].required
      },
    });
  };

  const isValidForm = () => {
    let newFormData = formData;

    var isValid = true;
    Object.keys(formData).forEach((key) => {
      if (formData[key].required && !formData[key].value) {
        isValid = false;
        formData[key].error = 'Required';
      }
    });

    setFormData({ ...formData, ...newFormData });
    return isValid
  };

  const submitForm = () => {
    isValidForm()
    console.log(formData);
  }

  return (
    <div className={styles.container}>
      <FormInputView
        name='fullName'
        displayName='Full Name'
        placeholder='Enter your full name'
        value={formData.fullName.value}
        error={formData.fullName.error}
        onValueChange={updateFormData}
        inputType={INPUT_TYPE.text}
      />

      <br />

      <FormInputView
        name='mobileNumber'
        displayName='Mobile Number'
        placeholder='Enter your mobile number'
        value={formData.mobileNumber.value}
        error={formData.mobileNumber.error}
        onValueChange={updateFormData}
        inputType={INPUT_TYPE.number}
        maxLength={10}
      />

      <br />

      <FormInputView
        name='image'
        displayName='Image'
        value={formData.image.value}
        error={formData.image.error}
        onValueChange={updateFormData}
        onFileSelect={() => { }}
        inputType={INPUT_TYPE.file}
      />

      <button onClick={submitForm}>Submit</button>
    </div>
  )
}
