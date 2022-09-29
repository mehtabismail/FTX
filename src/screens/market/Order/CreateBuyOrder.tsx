import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderTypeForm from './OrderTypeForm';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/Store';
import WarningMsg from './WarningMsg';
import CheckBox from './CheckBox';
import CustomButton from '../../../components/CustomButton';
import Colors from '../../../theme/Colors';
import {useToast} from 'react-native-toast-notifications';
import {
  startLoading,
  stopLoading,
} from '../../../redux/reducers/loading/Loading';

const CreateBuyOrder = (props: any) => {
  console.log(props?.orderData?.price, 'shawal is checking');
  var orderType = props?.orderType;
  orderType = orderType.replace(/\s+/g, '_');
  const passedValuePrice = props?.price;
  const toast = useToast();
  const orderName = props?.btnText;

  const {baseCurrency, quoteCurrency} = props?.orderData;
  const [checked, setChecked] = useState(false);
  const [post, setPost] = useState(false);
  const [ioc, setIoc] = useState(false);
  const [price, setPrice] = useState<any>();
  const [amount, setAmount] = useState<any>(0);
  const [currentSize, setCurrentSize] = useState<any>(0);
  const [actualSize, setActualSize] = useState<any>(0);
  const [triggerPrice, setTriggerPrice] = useState<any>(props?.price);
  const [limitPrice, setLimitPrice] = useState<any>(props?.price);

  const dispatch = useDispatch();
  const {email, render, status, token}: any = useSelector(
    (state: RootState) => state?.registerProps,
  );
  const loading = useSelector((state: RootState) => state?.loading?.isLoading);
  const [formData, setFormData] = useState({
    price:
      props?.orderType === 'Trailing stop' ? '0.0' : props?.orderData?.price,
    trailValue: '0.0',
    marketValue: 'Market',
    triggerPrice: props?.orderData.price,
    limitprice: props?.orderData.price,
    takeProfitValue: props?.orderData.price,
    profitLimitPrice: props?.orderData.price,
    profitTriggerPrice: props?.orderData.price,
    amountBtc: '',
    amountUsd: null,
  });

  const textInputHandler = (value: any, inputHeading: any, orderType: any) => {
    console.log(inputHeading, orderType, value);

    // MARKET ORDER SCENERIO
    if (orderType === 'Market order') {
      orderType = orderType;
      if (inputHeading === `Amount(${props?.orderData?.baseCurrency})`) {
        setFormData({
          ...formData,
          amountBtc: value,
          amountUsd: Number(value * formData?.price) as any,
        });
        setActualSize(value);
        setCurrentSize(value);
      }
      if (inputHeading === `Amount(${props?.orderData?.quoteCurrency})`) {
        const a: any = value / formData.price.toString();
        setFormData({
          ...formData,
          amountBtc: (value / formData.price.toString()) as any,
          amountUsd: value,
        });
        setActualSize(value / formData.price);
        setCurrentSize(value / formData.price);
      }
    }
    // LIMIT ORDER SCENERIO
    else if (orderType === 'Limit order') {
      orderType = orderType;
      if (inputHeading === `Amount(${props?.orderData?.baseCurrency})`) {
        setFormData({
          ...formData,
          amountBtc: value,
          amountUsd: Number(value * formData?.price) as any,
        });
        setActualSize(value);
        setCurrentSize(value);
      }
      if (inputHeading === `Amount(${props?.orderData?.quoteCurrency})`) {
        setFormData({
          ...formData,
          amountBtc: (value / formData.price.toString()) as any,
          amountUsd: value,
        });
        setActualSize(value / formData.price);
        setCurrentSize(value / formData.price);
      }
    }
    // STOP MARKET SCENERIO
    else if (orderType === 'Stop market') {
      orderType = orderType;
      if (inputHeading === `Amount(${props?.orderData?.baseCurrency})`) {
        setFormData({
          ...formData,
          amountBtc: value,
          amountUsd: Number(value * formData?.price) as any,
        });
        setActualSize(value);
        setCurrentSize(value);
      }
      if (inputHeading === `Amount(${props?.orderData?.quoteCurrency})`) {
        setFormData({
          ...formData,
          amountBtc: (value / formData.price.toString()) as any,
          amountUsd: value,
        });
        setActualSize(value / formData.price);
        setCurrentSize(value / formData.price);
      }
    }
    // STOP LIMIT ORDER SCENERIO
    else if (orderType === 'Stop limit') {
      orderType = orderType;
      if (inputHeading === `Amount(${props?.orderData?.baseCurrency})`) {
        setFormData({
          ...formData,
          amountBtc: value,
          amountUsd: Number(value * formData?.price) as any,
        });
        setActualSize(value);
        setCurrentSize(value);
      }
      if (inputHeading === `Amount(${props?.orderData?.quoteCurrency})`) {
        setFormData({
          ...formData,
          amountBtc: (value / formData.price.toString()) as any,
          amountUsd: value,
        });
        setActualSize(value / formData.price);
        setCurrentSize(value / formData.price);
      }
    }
    // TAKE PROFIT ORDER SCENERIO
    else if (orderType === 'Take profit') {
      orderType = orderType;

      if (inputHeading === `Amount(${props?.orderData?.baseCurrency})`) {
        setFormData({
          ...formData,
          amountBtc: value,
          amountUsd: Number(value * formData?.price) as any,
        });
        setActualSize(value);
        setCurrentSize(value);
      }
      if (inputHeading === `Amount(${props?.orderData?.quoteCurrency})`) {
        setFormData({
          ...formData,
          amountBtc: (value / formData.price.toString()) as any,
          amountUsd: value,
        });
        setActualSize(value / formData.price);
        setCurrentSize(value / formData.price);
      }
    }
    // TAKE_PROFIT_LIMIT ORDER SCENERIO
    else if (orderType === 'Take profit limit') {
      orderType = orderType;

      if (inputHeading === `Amount(${props?.orderData?.baseCurrency})`) {
        setFormData({
          ...formData,
          amountBtc: value,
          amountUsd: Number(value * formData?.price) as any,
        });
        setActualSize(value);
        setCurrentSize(value);
      }
      if (inputHeading === `Amount(${props?.orderData?.quoteCurrency})`) {
        setFormData({
          ...formData,
          amountBtc: (value / formData.price.toString()) as any,
          amountUsd: value,
        });
        setActualSize(value / formData.price);
        setCurrentSize(value / formData.price);
      }
    }
  };

  const onClickHandler = () => {
    checksBeforApi();
  };

  const checksBeforApi = () => {
    callApi();
  };

  const callApi = async () => {
    dispatch(startLoading());
    let data;
    if (orderType === 'Stop_Market' || orderType === 'Take_Profit') {
      data = {
        order_type: orderType.toLowerCase(),
        base_currency: baseCurrency.toLowerCase(),
        quote_currency: quoteCurrency.toLowerCase(),
        current_size: currentSize,
        actual_size: actualSize,
        side_type: orderName.toLowerCase(),
        price: formData.amountUsd,
        is_retry: false,
        trigger_price: triggerPrice,
        market_price: props?.orderData?.price,
      };
    } else if (
      orderType === 'Stop_Limit' ||
      orderType === 'Take_Profit_Limit'
    ) {
      data = {
        order_type: orderType.toLowerCase(),
        base_currency: baseCurrency.toLowerCase(),
        quote_currency: quoteCurrency.toLowerCase(),
        current_size: currentSize,
        actual_size: actualSize,
        side_type: orderName.toLowerCase(),
        price: formData.amountUsd,
        is_retry: false,
        trigger_price: triggerPrice,
        limit_Price: limitPrice,
        market_price: props?.orderData?.price,
      };
    } else {
      data = {
        order_type: orderType.toLowerCase(),
        base_currency: baseCurrency.toLowerCase(),
        quote_currency: quoteCurrency.toLowerCase(),
        current_size: currentSize,
        actual_size: actualSize,
        side_type: orderName.toLowerCase(),
        price: formData.amountUsd,
        market_price: props?.orderData?.price,
        is_post: post,
        is_ioc: ioc,
        is_retry: checked,
        is_enabled: 'false',
      };
    }

    console.log(data, 'form data to test');

    fetch('http://146.190.17.79:9000/api/order', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...data}),
    })
      .then(response => response.text())
      .then(result => {
        dispatch(stopLoading());
        props.setOrderCompleted(!props?.orderCompleted);
        toast.show(result, {
          type: 'success',
          placement: 'bottom',
          animationType: 'zoom-in',
        });

        setTimeout(() => {
          toast.hideAll();
        }, 2000);
      })
      .catch(error => {
        toast.show(error, {
          type: 'success',
          placement: 'bottom',
          animationType: 'zoom-in',
        }),
          setTimeout(() => {
            toast.hideAll();
          }, 2000);
      });
  };

  useEffect(() => {
    setFormData({
      price:
        props?.orderType === 'Trailing stop' ? '0.0' : props?.orderData?.price,
      trailValue: '0.0',
      marketValue: 'Market',
      triggerPrice: props?.orderData.price,
      limitprice: props?.orderData.price,
      takeProfitValue: props?.orderData.price,
      profitLimitPrice: props?.orderData.price,
      profitTriggerPrice: props?.orderData.price,
      amountBtc: '',
      amountUsd: null,
    });
  }, [orderType]);

  const triggerPriceHandler = (
    value: any,
    inputHeading: any,
    orderType: any,
  ) => {
    setTriggerPrice(value);
  };

  const limitPriceHandler = (value: any, inputHeading: any, orderType: any) => {
    setLimitPrice(value);
  };

  return (
    <View>
      <OrderTypeForm
        Btntext={props?.Btntext}
        HandleVisibility={props?.HandleVisibility}
        orderType={props?.orderType}
        setOrderType={props?.setOrderType}
        textInputHandler={textInputHandler}
        price={price}
        formData={formData}
        setPrice={setPrice}
        orderData={props.orderData}
        triggerPrice={triggerPrice}
        triggerPriceHandler={triggerPriceHandler}
        limitPrice={limitPrice}
        limitPriceHandler={limitPriceHandler}
      />
      <View>
        {status === 'initial' ? (
          <WarningMsg />
        ) : (
          <View>
            {props?.orderType === 'Market order' ||
            props?.orderType === 'Limit order' ? (
              <View>
                <CheckBox checked={post} setChecked={setPost} labelTxt="Post" />
                <CheckBox checked={ioc} setChecked={setIoc} labelTxt="Ioc" />
              </View>
            ) : null}

            {props?.orderType === 'Stop market' ||
            props?.orderType === 'Trailing stop' ||
            props?.orderType === 'Take profit' ? (
              <View>
                <CheckBox
                  checked={checked}
                  setChecked={setChecked}
                  labelTxt="Retry"
                />
              </View>
            ) : null}
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => onClickHandler()}
        disabled={loading ? true : false}
        style={{
          backgroundColor: Colors.Primary,
          height: 40,
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text>{props?.btnText}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CreateBuyOrder;

const styles = StyleSheet.create({});
