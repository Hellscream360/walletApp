import { useQuery, useQueryClient } from '@tanstack/react-query';
import { assetService } from '../services/assetService';
import type { Asset, AssetPrice } from '../types/asset';
import { supabase } from '../lib/supabase';

const PRICE_UPDATE_INTERVAL = 4 * 60 * 60 * 1000; // 4 heures en millisecondes

export const useAssetPrices = (walletId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['wallet-assets', walletId],
    queryFn: async () => {
      // Récupérer les actifs du wallet depuis Supabase
      const { data: walletAssets, error } = await supabase
        .from('wallet_assets')
        .select('*')
        .eq('wallet_id', walletId);

      if (error) throw error;

      // Mettre à jour les prix pour chaque actif
      const updatedAssets = await Promise.all(
        walletAssets.map(async (walletAsset) => {
          const asset: Asset = {
            id: walletAsset.asset_id,
            symbol: walletAsset.asset_symbol,
            type: walletAsset.asset_type,
            provider: walletAsset.asset_provider,
            price: walletAsset.current_price,
            name: '', // À remplir si nécessaire
          };

          const price = await assetService.getAssetPrice(asset);
          if (price) {
            // Mettre à jour le prix dans Supabase
            await supabase
              .from('wallet_assets')
              .update({
                current_price: price.current,
                last_updated: new Date().toISOString(),
              })
              .eq('id', walletAsset.id);

            return {
              ...walletAsset,
              current_price: price.current,
              last_updated: new Date().toISOString(),
            };
          }

          return walletAsset;
        })
      );

      return updatedAssets;
    },
    refetchInterval: PRICE_UPDATE_INTERVAL,
    refetchIntervalInBackground: true,
  });
};
