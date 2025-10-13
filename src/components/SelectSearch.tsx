import { useMounted } from '#/helpers';
import {
  Combobox,
  ComboboxItem,
  InputBase,
  InputBaseProps,
  Loader,
  MantineRadius,
  useCombobox,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import React, { CSSProperties, KeyboardEvent, useEffect, useState } from 'react';

export interface SearchSelectProps {
  customTypes?: string[];
  fetchItems: (query: string) => Promise<ComboboxItem[]>;
  value?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  label?: string;
  error?: string | boolean;
  disabled?: boolean;
  renderOption?: (item: ComboboxItem) => React.ReactNode;
  variant?: InputBaseProps['variant'];
  radius?: MantineRadius;
  style?: CSSProperties;
  className?: string;
}

function SelectSearch({
  customTypes = [],
  fetchItems,
  onChange,
  value: controlledValue,
  placeholder,
  label,
  error: externalError,
  disabled,
  renderOption,
  variant,
  radius,
  style,
  className,
}: SearchSelectProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(controlledValue || null);
  const [data, setData] = useState<ComboboxItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [search, setSearch] = useState<string>('');
  const [searchDebounced] = useDebouncedValue(search, 300);
  const mounted = useMounted();

  useEffect(() => {
    async function performFetch() {
      try {
        setData(await fetchItems(searchDebounced));
        setError(null);
      } catch (suggestError) {
        setError(suggestError as Error);
      }

      setLoading(false);
    }

    // Only perform a search if the user has provided an input
    if (searchDebounced?.length > 0 || !mounted) performFetch();
  }, [searchDebounced, mounted, fetchItems]);

  // Sort the menu items alphabetically by label
  const dataSorted = orderBy(data, [(filter) => filter.label?.toLowerCase()], ['asc']);

  // Combine unique data with custom types
  const allData = [
    ...uniqBy(dataSorted, 'value'),
    ...(search.length > 0
      ? customTypes.map((type) => ({
          type,
          value: `${type}:${search}`,
          label: search,
        }))
      : []),
  ];

  const handleChange = (newValue: string | null) => {
    setValue(newValue);
    if (onChange) onChange(newValue);
    setSearch(newValue ? allData.find((item) => item.value === newValue)?.label || '' : '');
    combobox.closeDropdown();
  };

  // Handler for enter key
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onChange && allData.length > 0) {
      const firstValue = allData[0].value;
      setValue(firstValue);
      onChange(firstValue);
      setSearch(allData[0].label || '');
      combobox.closeDropdown();
    }
  };

  const options = allData.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      {renderOption ? renderOption(item) : item.label}
    </Combobox.Option>
  ));

  const displayValue = value
    ? allData.find((item) => item.value === value)?.label || search
    : search;

  return (
    <Combobox store={combobox} onOptionSubmit={handleChange} withinPortal={false}>
      <Combobox.Target>
        <InputBase
          label={label}
          placeholder={placeholder}
          value={displayValue}
          variant={variant}
          radius={radius}
          style={style}
          className={className}
          onChange={(event) => {
            const newValue = event.currentTarget.value;
            setSearch(newValue);
            if (newValue === '') {
              setValue(null);
              if (onChange) onChange(null);
            }
            if (newValue !== '') setLoading(true);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onKeyDown={handleKeyPress}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            // Reset search to the selected value's label if a value is selected
            if (value) {
              setSearch(allData.find((item) => item.value === value)?.label || '');
            }
          }}
          rightSection={loading ? <Loader size='xs' /> : null}
          leftSection={<IconSearch size={18} />}
          error={externalError || (error && error.message)}
          disabled={disabled}
          rightSectionPointerEvents='none'
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>
              {searchDebounced.length > 0 && !loading
                ? `Nothing found for '${searchDebounced}'`
                : 'Enter search query above'}
            </Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default SelectSearch;
