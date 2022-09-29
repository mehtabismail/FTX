import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RegisterService = async (
  data: any,
  success: Function,
  fail: Function,
) => {
  console.log(data.email, data.password, 'data of request');
  const response = await fetch('http://146.190.17.79:9000/api/users/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });
  if (response.status >= 200 && response.status <= 299) {
    const res = await response.json();
    console.log(res, 'Response of API request again');
    success(res);
  } else {
    const res = await response.json();
    fail(res);
  }

  try {
    
  } catch (error) {
    
  }
};

export default RegisterService;

const styles = StyleSheet.create({});
