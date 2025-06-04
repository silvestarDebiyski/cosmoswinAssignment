import React from 'react';

type InputProps = {
	type: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
	styles?: any;
	label?: string;
	placeholder?: string;
};

const Input: React.FC<InputProps> = ({
	type,
	onChange,
	value,
	styles,
	label,
	placeholder = '',
}) => {
	return (
		<div className={styles.inputContainer}>
			{label && <label className={styles.labelForInput}>{label}</label>}
			<input
				min={type === 'number' ? '1' : ''}
				value={value}
				onChange={onChange}
				type={type}
				placeholder={placeholder}
				name="input"
				className={styles.numberInput}
			/>
		</div>
	);
};

export default Input;
