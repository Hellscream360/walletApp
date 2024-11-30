import { useState } from 'react';
import { Asset } from '../types/asset';
import AssetSelect from './AssetSelect';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { supabase } from '../lib/supabase';

interface AddAssetFormProps {
  walletId: string;
  onAssetAdded: () => void;
}

export default function AddAssetForm({ walletId, onAssetAdded }: AddAssetFormProps) {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAssetSelect = (asset: Asset) => {
    setSelectedAsset(asset);
    setPurchasePrice(asset.price.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.from('wallet_assets').insert({
        wallet_id: walletId,
        asset_id: selectedAsset.id,
        asset_symbol: selectedAsset.symbol,
        asset_name: selectedAsset.name,
        asset_type: selectedAsset.type,
        asset_provider: selectedAsset.provider,
        quantity: parseFloat(quantity),
        purchase_price: parseFloat(purchasePrice),
        current_price: selectedAsset.price,
      });

      if (error) throw error;

      toast({
        title: "Actif ajouté",
        description: `${selectedAsset.symbol} a été ajouté à votre wallet`,
      });

      // Reset form
      setSelectedAsset(null);
      setQuantity('');
      setPurchasePrice('');
      onAssetAdded();

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'actif. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Sélectionner un actif</Label>
        <AssetSelect onAssetSelect={handleAssetSelect} />
      </div>

      {selectedAsset && (
        <>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantité</Label>
            <Input
              id="quantity"
              type="number"
              step="any"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0.00"
              required
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchasePrice">Prix d'achat (USD)</Label>
            <Input
              id="purchasePrice"
              type="number"
              step="any"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="0.00"
              required
              min="0"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Ajout en cours..." : "Ajouter l'actif"}
          </Button>
        </>
      )}
    </form>
  );
}
