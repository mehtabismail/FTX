import {Icon} from '@rneui/themed';
import React, {FC, ReactElement, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import DropDown from '../.../../assets/signinScreen/dropDown.svg';
import Colors from '../theme/Colors';
import metrics from '../theme/Metrics';
import {Shadow} from './styles/ScreenStyle';

const Dropdown: any = ({label, data, onSelect, Svg}: any) => {
  const DropdownButton: any = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<any>(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure(
      (_fx: any, _fy: any, _w: any, h: any, _px: any, py: any) => {
        setDropdownTop(py + h);
      },
    );
    setVisible(true);
  };

  const onItemPress = (item: any) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({item}: any): ReactElement<any, any> => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, {top: dropdownTop}]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={[styles.button, Shadow]}
      onPress={toggleDropdown}>
      {renderDropdown()}
      <Text style={styles.buttonText}>{selected ? selected.label : label}</Text>
      <View>
        {!!Svg ? (
          <View style={styles.svgContainer}>
            <Svg />
          </View>
        ) : (
          <View>
            {visible ? (
              <Icon style={styles.icon} type="font-awesome" name="chevron-up" />
            ) : (
              <Icon
                style={styles.icon}
                type="font-awesome"
                name="chevron-down"
              />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: 150,
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    height: 50,
    zIndex: 1,
    marginRight: 15
  },
  buttonText: {
    flex: 1,
    paddingLeft: metrics.regularPadding,
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    left: '10%',
    backgroundColor: '#fff',
    width: '80%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    maxHeight: 200,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  svgContainer: {marginRight: metrics.regularMargin},
});

export default Dropdown;
