import { Autocomplete, Box, Checkbox, FormControl, FormControlLabel, FormHelperText, TextField, TextFieldProps, Typography } from '@mui/material';
import { useController } from 'react-hook-form';
import DatePickerScreen from '../date-picker';

type Props = {
	name: string;
	label?: any;
	placeholder?: string;
	control: any;
	rules?: any;
	sx?: any;
	labelProps?: any;
	internalLabel?: boolean;
	defaultValue?: any;
	options?: any;
	getOptionLabel?: any;
	disabled?: boolean;
} & TextFieldProps

export const FormInput = ({
	name,
	control,
	label,
	rules,
	sx,
	internalLabel = true,
	...rest
}: Props) => {
	const { field, fieldState } = useController({
		name,
		control,
		rules,
	});

	const { error } = fieldState;

	return (
		<FormControl fullWidth>
			<TextField
				label={internalLabel ? label : null}
				size="small"
				error={!!error}
				fullWidth={true}
				variant="outlined"
				sx={{
					width: '100%',
					backgroundColor: '#ffffff',
					color: '#111111',
					...sx
				}}
				{...field}
				{...rest}
			/>
			{error && (
				<FormHelperText
					sx={{
						color: '#F80606'
					}}
				>
					{error?.message}
				</FormHelperText>
			)}
		</FormControl>
	);
}

export const FormInput02 = ({
	name,
	control,
	label,
	rules,
	sx,
	labelProps,
	placeholder,
	...rest
}: Props) => {
	const { field, fieldState } = useController({
		name,
		control,
		rules,
	});

	const { error } = fieldState;

	return (
		<FormControl fullWidth>
			{label && <Typography
				mb={1}
				variant="h7"
				fontWeight={"900"}
				{...labelProps} >
				{label}
			</Typography>}
			<TextField
				placeholder={placeholder || label}
				size="small"
				error={!!error}
				fullWidth={true}
				variant="outlined"
				sx={{
					width: '100%',
					backgroundColor: '#ffffff',
					color: '#111111',
					'& .MuiInputBase-root': {
						height: {
							xs: '40px',
							sm: '40px',
							md: '45px',
							lg: '45px',
							xl: '50px',
						},
					},
					...sx
				}}
				{...field}
				{...rest}
			/>
			{error && (
				<FormHelperText
					sx={{
						color: '#F80606'
					}}
				>
					{error?.message}
				</FormHelperText>
			)}
		</FormControl>
	);
}

export const FormAutoComplete = ({
	name,
	control,
	label,
	rules,
	sx,
	labelProps,
	placeholder,
	disabled,
	options,
	getOptionLabel,
	...rest
}: Props) => {
	const { field, fieldState } = useController({
		name,
		control,
		rules,
	});

	const { error } = fieldState;
	const { value: selectValue, onChange } = field;

	return (
		<FormControl fullWidth>
			{label && <Typography
				mb={1}
				variant="h7"
				fontWeight={"900"}
				{...labelProps} >
				{label}
			</Typography>}

			<Autocomplete
				fullWidth={true}
				disabled={disabled}
				id="update-autocomplete"
				options={options}
				value={selectValue}
				onChange={(event: any, newValue: any) => {
					onChange(newValue);
				}}
				getOptionLabel={getOptionLabel}
				sx={{
					width: '100%',
					'& .MuiInputBase-root': {
						py: "0px",
						height: {
							xs: '40px',
							sm: '40px',
							md: '45px',
							lg: '45px',
							xl: '50px',
						},
					},
					...sx
				}}
				renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
			/>
			{error && (
				<FormHelperText
					sx={{
						color: '#F80606'
					}}
				>
					{error?.message}
				</FormHelperText>
			)}
		</FormControl>
	);
}

export const FormCheckBox = ({
	name,
	control,
	label,
	rules,
	sx,
	disabled,
	labelProps,
	placeholder,
	defaultValue,
	...rest
}: Props) => {
	const { field } = useController({
		name,
		control,
		rules,
	});

	const { value, onChange } = field;

	return (
		<FormControl fullWidth>
			<FormControlLabel label={label}
				disabled={disabled}
				onChange={() => onChange(defaultValue)}
				control={<Checkbox checked={value === defaultValue} />}  />
		</FormControl>
	);
}

export const FormDatePicker = ({
	name,
	control,
	label,
	rules,
	sx,
	labelProps,
	defaultValue,
}: Props) => {
	const { field, fieldState } = useController({
		name,
		control,
		rules,
	});

	const { error } = fieldState;
	const { value } = field;

	return (
		<FormControl fullWidth >
			<Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: 2}}>
				{label && <Typography
					variant="h7"
					fontWeight={"900"}
					{...labelProps} >
					{label}
				</Typography>}
				<DatePickerScreen
					sx={{
						...sx,
						'& .MuiInputBase-root': {
							height: "44px"
						},
					}}
					{...field}
					// onChange={() => onChange(defaultValue)}
					control={<Checkbox checked={value === defaultValue} />}  />
			</Box>
			{error && (
				<FormHelperText
					sx={{
						ml: "30%",
						color: '#F80606'
					}}
				>
					{error?.message}
				</FormHelperText>
			)}
		</FormControl>
	);
}
