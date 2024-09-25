import React, { useState } from 'react';
import { Stack, TextField, PrimaryButton, Text, MessageBar, MessageBarType, useTheme } from '@fluentui/react';
import { getFormTextFieldStyles } from '../styles/styles'; 

const Register: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { name } = e.currentTarget;
    setForm({ ...form, [name]: newValue || '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email === '' || form.password === '' || form.confirmPassword === '') {
      setError('Please fill in all fields');
    } else if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError(null);
    }
  };

  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      styles={{
        root: {
          minHeight: '100vh',
          backgroundColor: theme.palette.neutralLighter,
          padding: 20,
        },
      }}
    >
      <Stack
        styles={{
          root: {
            width: '100%',
            maxWidth: '400px',
            padding: '20px',
            backgroundColor: theme.palette.white,
            borderRadius: '8px',
            boxShadow: theme.effects.elevation8,
          },
        }}
      >
        <Text variant="xLarge" styles={{ root: { marginBottom: '20px', color: theme.palette.themePrimary } }}>
          Register
        </Text>

        {error && (
          <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
            {error}
          </MessageBar>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            styles={getFormTextFieldStyles(theme)}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            canRevealPassword
            required
            styles={getFormTextFieldStyles(theme)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            canRevealPassword
            required
            styles={getFormTextFieldStyles(theme)}
          />
          <PrimaryButton type="submit" text="Register" styles={{ root: { marginTop: '40px', width: '100%' } }} />
        </form>
      </Stack>
    </Stack>
  );
};

export default Register;
