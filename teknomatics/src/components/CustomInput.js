import React from 'react';
import {Text, TextInput, StyleSheet, View} from 'react-native';

import Colors from '../constants/Colors';

export const LeadingText = ({text, onPress}) => (
  <Text onPress={onPress} style={styles.leading}>
    {text}
  </Text>
);

export default CustomInput = React.forwardRef((props, ref) => {
  const {
    value,
    error,
    touched,
    onChange,
    onBlur,
    setFieldTouched,
    title,
    leadingTitle,
    countryCode,
    onCodePress,
    secureTextEntry,
    passwordVisible,
    setPasswordVisible,
    optional,
    style,
    editable = true,
    ...inputProps
  } = props;

  const hasError = error && touched;

  let leading = null;
  let inputStyle = {paddingLeft: 20};

  if (leadingTitle === 'emailPhone') {
    if (value.length > 2) {
      inputStyle.paddingLeft = 8;
      if (!isNaN(value)) {
        leading = <LeadingText text={countryCode} onPress={onCodePress} />;
      } else {
        leading = <LeadingText text="@" />;
      }
    } else {
      inputStyle.paddingLeft = 20;
    }
  } else if (leadingTitle === 'phone') {
    inputStyle.paddingLeft = 8;
    leading = <LeadingText text={countryCode} onPress={onCodePress} />;
  } else if (leadingTitle === 'email') {
    inputStyle.paddingLeft = 8;
    leading = <LeadingText text="@" />;
  }

  return (
    <View>
      {title === undefined ? null : (
        <Text style={styles.lable}>
          {title} {optional && <Text style={styles.optional}>(optional)</Text>}
        </Text>
      )}
      <View style={[styles.container, style]}>
        {/* {title == undefined ? null : (<Text style={styles.title}>
        {title} {optional && <Text style={styles.optional}>(optional)</Text>}
      </Text>)}  */}
        <View
          style={[
            styles.inputContainer,
            hasError && styles.errorInput,
            !editable && styles.nonEditable,
          ]}>
          {leading}
          <TextInput
            ref={ref}
            style={[styles.textInput, inputStyle]}
            value={value}
            onChangeText={text => onChange(text)}
            onBlur={() => {
              setFieldTouched();
              onBlur();
            }}
            secureTextEntry={secureTextEntry && !passwordVisible}
            placeholderTextColor="grey"
            editable={editable}
            {...inputProps}
          />
        </View>
        {hasError && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    marginBottom: 16,
    marginLeft: 5,
    color: Colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  optional: {
    fontWeight: '400',
    fontSize: 12,
    shadowColor: Colors.white.default,
    color: Colors.textSecondary,
    borderColor: Colors.white.default,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  leading: {
    paddingRight: 8,
    paddingLeft: 12,
    paddingVertical: 5,
    borderRightWidth: 1,
    color: Colors.textSecondary,
    minWidth: 42,
    textAlign: 'center',
  },
  textInput: {
    flex: 1,
    height: 48,
    paddingRight: 20,
    fontSize: 16,
    color: 'black',
  },
  trailing: {
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  lable: {
    position: 'absolute',
    fontSize: 12,
    backgroundColor: Colors.white.default,
    zIndex: 1,
    paddingRight: 4,
    paddingLeft: 8,
    shadowColor: Colors.white.default,
    color: Colors.textSecondary,
    marginHorizontal: 20,
    marginTop: 1,
    borderColor: Colors.white.default,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  nonEditable: {
    backgroundColor: '#E9ECEF',
  },
});
