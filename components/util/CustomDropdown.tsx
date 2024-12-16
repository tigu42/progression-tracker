import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];


interface CustomDropdownProps {
    onSelect: (value: string) => void,
    data: {label: string, value: string}[],
    initialData?: string
}

const CustomDropdown = ({onSelect, data, initialData}: CustomDropdownProps) => {
  const [value, setValue] = useState(initialData !== null ? initialData : '');

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder=" Übung wählen"
      searchPlaceholder="Nach Übung suchen..."
      value={value}
      onChange={item => {
        setValue(item.value);
        onSelect(item.value);
      }}
      renderLeftIcon={() => (
        <MaterialCommunityIcons style={styles.icon} name="dumbbell" size={20} color="black" />
      )}
    />
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});