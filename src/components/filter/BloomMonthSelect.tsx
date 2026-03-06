import { usePlantFilter } from '@/contexts/PlantFilterContext';
import { BLOOM_MONTHS } from '@/types/plant';
import { FormControl, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { FilterLabel } from './FilterLabel';
import { sizeConfig } from './ToggleButtonFilter';

export function BloomMonthSelect({ size, ...props }) {
    const { filters, setBloomMonths } = usePlantFilter();
    const config = sizeConfig[size ?? "lg"];

    return (
        <FormControl>
            <FilterLabel size={size}>
                Bloom Months
            </FilterLabel>
            <ToggleButtonGroup
                size={config?.toggleButtonSize}
                value={filters.bloomMonths}
                onChange={(_, value) => setBloomMonths(value)}
                fullWidth
                {...props}
            >
                {BLOOM_MONTHS.map(month =>
                    <ToggleButton key={month} value={month} >
                        <Typography variant="caption" sx={{
                            width: 30,
                            height: 20,
                            textTransform: "uppercase"
                            }}>
                            {month}
                        </Typography>
                    </ToggleButton>
                )}
            </ToggleButtonGroup>
        </FormControl>
    );
};
