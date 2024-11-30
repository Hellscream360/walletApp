import { useState } from 'react';
import Select from 'react-select/async';
import { components } from 'react-select';
import { assetService } from '../services/assetService';
import type { Asset } from '../types/asset';

interface AssetOption {
  value: Asset;
  label: string;
  data: Asset;
}

const AssetOption = ({ data, ...props }: any) => {
  const asset = data.data;
  return (
    <components.Option {...props}>
      <div className="flex items-center space-x-3">
        {asset.imageUrl && (
          <img src={asset.imageUrl} alt={asset.name} className="w-6 h-6" />
        )}
        <div>
          <div className="font-medium">{asset.symbol}</div>
          <div className="text-sm text-gray-500">{asset.name}</div>
        </div>
        <div className="ml-auto">
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700">
            {asset.type.toUpperCase()}
          </span>
        </div>
      </div>
    </components.Option>
  );
};

interface Props {
  onAssetSelect: (asset: Asset) => void;
}

const AssetSelect = ({ onAssetSelect }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const loadOptions = async (inputValue: string) => {
    if (inputValue.length < 2) return [];
    
    const assets = await assetService.searchAssets(inputValue);
    return assets.map((asset): AssetOption => ({
      value: asset,
      label: asset.symbol,
      data: asset,
    }));
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: 'transparent',
      borderColor: 'rgb(75, 85, 99)',
      '&:hover': {
        borderColor: 'rgb(59, 130, 246)',
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: 'rgb(31, 41, 55)',
      border: '1px solid rgb(75, 85, 99)',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? 'rgb(55, 65, 81)' : 'transparent',
      '&:hover': {
        backgroundColor: 'rgb(55, 65, 81)',
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: 'white',
    }),
    input: (base: any) => ({
      ...base,
      color: 'white',
    }),
  };

  return (
    <Select
      cacheOptions
      defaultOptions
      value={null}
      inputValue={inputValue}
      onInputChange={(newValue) => setInputValue(newValue)}
      onChange={(option) => {
        if (option) {
          onAssetSelect((option as AssetOption).value);
        }
      }}
      loadOptions={loadOptions}
      components={{ Option: AssetOption }}
      styles={customStyles}
      placeholder="Rechercher un actif (ex: BTC, AAPL, EUR...)"
      noOptionsMessage={() => "Commencez à taper pour rechercher..."}
      loadingMessage={() => "Recherche en cours..."}
      className="text-base"
      isSearchable
      isClearable
    />
  );
};

export default AssetSelect;
