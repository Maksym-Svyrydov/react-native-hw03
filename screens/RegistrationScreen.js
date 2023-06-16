import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
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
  Image,
  Dimensions,
} from 'react-native';

export default function RegisterForm() {
  const initialState = {
    name: '',
    email: '',
    password: '',
    avatar: null,
  };

  const [user, setUser] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState('');
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width);
  const [showPassword, useShowPassword] = useState(true);
  const addAvatar = async (e) => {
    if (!user.avatar) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setUser((prevState) => ({ ...prevState, avatar: result.uri }));
      }
    } else {
      setUser((prevState) => ({ ...prevState, avatar: null }));
    }
  };
  const submit = (e) => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(user);
    setUser(initialState);
  };
  // const width = Dimensions.get('window').width;
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      setDimensions(width);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => {
      return () => subscription?.remove();
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
      <View style={{ ...styles.container, flex: isShowKeyboard ? 0.6 : 0.6 }}>
        <View style={styles.innerContainer}>
          <View
            style={{ ...styles.avatarWrapper, left: (dimensions - 120) / 2 }}
          >
            <TouchableOpacity onPress={addAvatar}>
              {user.avatar && (
                <Image
                  src={user.avatar}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />
              )}
              {!user.avatar && (
                <Image
                  fadeDuration={0}
                  style={styles.avatarDefault}
                  source={require('../img/addicon.png')}
                />
              )}
              {user.avatar && (
                <Image
                  fadeDuration={0}
                  style={{ ...styles.removeIcon }}
                  source={require('../img/removeicon.png')}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Реєстрація</Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.inputWrapper}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: activeInput === 'login' ? '#FF6C00' : '#f6f6f6',
                }}
                placeholderTextColor="#BDBDBD"
                value={user.name}
                onChangeText={(value) =>
                  setUser((prevState) => ({ ...prevState, name: value }))
                }
                placeholder="Логін"
                onFocus={() => {
                  setIsShowKeyboard(true), setActiveInput('login');
                }}
              />
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: activeInput === 'email' ? '#FF6C00' : '#f6f6f6',
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
                    setUser((prevState) => ({ ...prevState, password: value }))
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
              <Text style={styles.btnText}>Зареєстуватися</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <TouchableOpacity style={styles.linkWrapper} onPress={openLink}>
            <Text style={styles.link}>Вже є акаунт? Увійти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 32,
    paddingBottom: 43,
    gap: 16,
  },
  avatarWrapper: {
    position: 'absolute',
    top: -90,
    borderRadius: 16,
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
  },
  avatarDefault: {
    position: 'absolute',
    top: 90,
    right: -10,
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
  removeIcon: {
    position: 'absolute',
    top: 86,
    right: -17,
    width: 37,
    height: 37,
    resizeMode: 'cover',
  },
  titleWrapper: {
    // alignItems: 'center',
    marginTop: 92,
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
    marginBottom: 42,
  },

  input: {
    padding: 10,
    marginBottom: 10,
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
