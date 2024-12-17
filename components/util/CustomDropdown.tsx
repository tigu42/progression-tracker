import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 20,
  },
  selectedTextStyle: {
    fontSize: 20,
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