import * as React from 'react';
import {
    Autocomplete,
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { Color } from '@/types/plant';


const FLOWER_COLORS: { label: string; value: Color, hex: string }[] = [
  { value: 'red', label: 'Red', hex: '#d32f2f' },
  { value: 'orange', label: 'Orange', hex: '#f57c00' },
  { value: 'yellow', label: 'Yellow', hex: '#fbc02d' },
  { value: 'green', label: 'Green', hex: '#388e3c' },
  { value: 'blue', label: 'Blue', hex: '#1976d2' },
  { value: 'purple', label: 'Purple', hex: '#7b1fa2' },
  { value: 'pink', label: 'Pink', hex: '#c2185b' },
  { value: 'white', label: 'White', hex: '#ffffff' },
];

export function FlowerColorSelect({ value, onChange, ...props }) {
    return (
        <Autocomplete
            multiple
            options={FLOWER_COLORS}
            value={FLOWER_COLORS.filter(c => value?.includes(c.value))}
            getOptionLabel={(option) => option.label}
            onChange={(_, newValue) => {
                onChange?.(newValue.map(c => c.value));
            }}
            renderValue={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                    <Chip
                        label={option.label}
                        size="small"
                        {...getTagProps({ index })}
                        sx={{
                            backgroundColor: option.hex,
                            color: option.value === 'white' ? 'black' : 'white',
                            fontWeight: 500,
                        }}
                    />
                ))
            }
            renderOption={(props, option) => (
                <Box
                    component="li"
                    {...props}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                    <Box
                        sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            backgroundColor: option.hex,
                            border: option.value === "white" ? '1px solid #ccc' : 'none',
                        }}
                    />
                    {option.label}
                </Box>
            )}
            renderInput={(params) => (
                <TextField {...params} label="Flower color" size="small" />
            )}
            sx={{ minWidth: 200 }}
        />
    );
}
