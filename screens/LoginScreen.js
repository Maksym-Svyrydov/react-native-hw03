import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export default function LoginForm() {
  const initialState = {
    email: '',
    password: '',
  };

  const [user, setUser] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState('');
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
  const [showPassword, useShowPassword] = useState(true);

  const submit = (e) => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(user);
    setUser(initialState);
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      setDimensions(width);
    };
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.addEventListener('change', onChange);
    };
  });
  function togglePassword() {
    if (user.password.trim() !== '') {
      if (showPassword) {
        useShowPassword(false);
      } else if (!showPassword) {
        useShowPassword(true);
      }
    }
  }

  const link = '';
  const openLink = () => Linking.openURL(link);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: isShowKeyboard ? 0.6 : 0.6 }}>
        <View style={styles.innerContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Увійти</Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.inputWrapper}>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor:
                      activeInput === 'email' ? '#FF6C00' : '#f6f6f6',
                  }}
                  placeholderTextColor="#BDBDBD"
                  value={user.email}
                  onChangeText={(value) =>
                    setUser((prevState) => ({ ...prevState, email: value }))
                  }
                  placeholder="Адреса електронної пошти"
                  onFocus={() => {
                    setIsShowKeyboard(true), setActiveInput('email');
                  }}
                />
              </View>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor:
                      activeInput === 'password' ? '#FF6C00' : '#f6f6f6',
                  }}
                  placeholderTextColor="#BDBDBD"
                  value={user.password}
                  onChangeText={(value) =>
                    setUser((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  placeholder="Пароль"
                  secureTextEntry={showPassword}
                  onFocus={() => {
                    setIsShowKeyboard(true), setActiveInput('password');
                  }}
                />
                <Text
                  style={{ ...styles.showPass, right: 32 }}
                  onPress={() => togglePassword()}
                >
                  Показати
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ ...styles.buttonWrapper, width: dimensions - 42 }}
              onPress={submit}
            >
              <Text style={styles.btnText}>Увійти</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={{
              ...styles.linkWrapper,
              marginBottom: isShowKeyboard ? 20 : 120,
            }}
            onPress={openLink}
          >
            <Text style={styles.link}>
              Немає акаунту? <Text>Зареєструватися</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    //  flex: 0.7,
    //  position: 'relative',
    //  justifyContent: 'flex-end',
    //  backgroundColor: '#fff',
    //  borderTopLeftRadius: 25,
    //  borderTopRightRadius: 25,
  },
  innerContainer: {
    justifyContent: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 32,
    paddingBottom: 43,
    gap: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  titleWrapper: {
    // alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  title: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    fontSize: 30,
    color: '#212121',
  },
  inputWrapper: {
    marginBottom: 43,
    gap: 16,
  },

  input: {
    padding: 10,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
  },
  showPass: {
    position: 'absolute',
    top: 16,
  },

  buttonWrapper: {
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginBottom: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  btnText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
  },

  linkWrapper: {},
  link: {
    marginLeft: 'auto',
    marginRight: 'auto',

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1B4371',
  },
});
