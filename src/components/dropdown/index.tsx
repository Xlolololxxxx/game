import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';

type DropdownItem<T> = {
    value: T | string | number;
    label: string;
}

type DropdownProps<T> = {
	items: DropdownItem<T>[];
	placeholder?: string;
	onSelect?: (selectedItem: T) => void;
	defaultSelected?: T;
	fullWidth?: boolean;
	variant?: any;
	sx?: any
}

export const Dropdown = <T,>({
	defaultSelected,
	placeholder = 'Select item',
	items,
	onSelect,
	fullWidth,
	variant,
	sx
}: DropdownProps<T>) => {
	const [selectedItem, setSelectedItem] = useState<T | ''>('');

	const handleChange = (event: SelectChangeEvent<T | ''>) => {
		const value = event.target.value as T;
		setSelectedItem(value);
		onSelect?.(value);
	};

	useEffect(() => {
		if (defaultSelected) setSelectedItem(defaultSelected);
	}, [defaultSelected]);

	return (
		<FormControl fullWidth={fullWidth || true} variant={variant || "outlined"} sx={sx} >
			<Select
				value={selectedItem}
				onChange={handleChange}
				displayEmpty
				label={selectedItem ? '' : placeholder}
			>
				<MenuItem value="" disabled>
					{placeholder}
				</MenuItem>
				{items.map((item) => (
					<MenuItem key={`${item.value}`} value={item.value as string}>
						{item.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

