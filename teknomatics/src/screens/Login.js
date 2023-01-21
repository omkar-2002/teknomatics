import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomInput from '../components/CustomInput';

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Please enter your First Name'),
  email: Yup.string()
    .trim()
    .required('Please enter your email')
    .email('Please Enter a valid email'),
});

const Login = ({navigation}) => {
  const onSubmit = values => {
    navigation.navigate('CameraHome', {name: values.name});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter the details to login</Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          email: '',
        }}
        onSubmit={onSubmit}
        enableReinitialize>
        {({
          handleSubmit,
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          setFieldTouched,
          isValid,
          dirty,
        }) => (
          <>
            <CustomInput
              value={values['name']}
              error={errors['name']}
              touched={touched['name']}
              onChange={handleChange('name')}
              onBlur={() => handleBlur('name')}
              setFieldTouched={() => setFieldTouched('name')}
              placeholder="Name"
              title="Name"
              returnKeyType="next"
            />
            <CustomInput
              value={values['email']}
              error={errors['email']}
              touched={touched['email']}
              onChange={handleChange('email')}
              onBlur={() => handleBlur('email')}
              setFieldTouched={() => setFieldTouched('email')}
              placeholder="Email"
              title="Email"
              returnKeyType="next"
              lable="Email"
              style={{marginBottom: 20}}
            />
            <Button
              onPress={handleSubmit}
              disabled={!(isValid && dirty)}
              title="Login"
              color={Colors.black.default}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white.default,
    padding: 20,
    justifyContent: 'center',
  },
  text: {
    color: Colors.black.default,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
