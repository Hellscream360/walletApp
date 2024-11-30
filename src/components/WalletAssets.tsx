import { useState } from 'react';
import { useAssetPrices } from '../hooks/useAssetPrices';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useToast } from './ui/use-toast';
import AddAssetForm from './AddAssetForm';
import { supabase } from '../lib/supabase';
import type { WalletAssetDB } from '../types/database';

interface WalletAssetsProps {
  walletId: string;
}

export default function WalletAssets({ walletId }: WalletAssetsProps) {
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const { data: assets, isLoading, refetch } = useAssetPrices(walletId);
  const { toast } = useToast();

  const handleDeleteAsset = async (assetId: string) => {
    try {
      const { error } = await supabase
        .from('wallet_assets')
        .delete()
        .eq('id', assetId);

      if (error) throw error;

      toast({
        title: "Actif supprimé",
        description: "L'actif a été supprimé de votre wallet",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'actif",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: 8,
    }).format(value);
  };

  const calculateProfitLoss = (asset: WalletAssetDB) => {
    const currentValue = asset.quantity * asset.current_price;
    const purchaseValue = asset.quantity * asset.purchase_price;
    return currentValue - purchaseValue;
  };

  const calculateProfitLossPercentage = (asset: WalletAssetDB) => {
    const profitLoss = calculateProfitLoss(asset);
    const purchaseValue = asset.quantity * asset.purchase_price;
    return (profitLoss / purchaseValue) * 100;
  };

  if (isLoading) {
    return <div>Chargement des actifs...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Actifs du Wallet</h2>
        <Dialog open={isAddAssetOpen} onOpenChange={setIsAddAssetOpen}>
          <DialogTrigger asChild>
            <Button>Ajouter un actif</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel actif</DialogTitle>
            </DialogHeader>
            <AddAssetForm
              walletId={walletId}
              onAssetAdded={() => {
                setIsAddAssetOpen(false);
                refetch();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {assets && assets.length > 0 ? (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actif</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Prix d'achat</TableHead>
                <TableHead>Prix actuel</TableHead>
                <TableHead>Valeur totale</TableHead>
                <TableHead>P/L</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => {
                const profitLoss = calculateProfitLoss(asset);
                const profitLossPercentage = calculateProfitLossPercentage(asset);
                const isProfit = profitLoss >= 0;

                return (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{asset.asset_symbol}</span>
                        <span className="text-sm text-gray-500">
                          {asset.asset_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{formatNumber(asset.quantity)}</TableCell>
                    <TableCell>{formatCurrency(asset.purchase_price)}</TableCell>
                    <TableCell>{formatCurrency(asset.current_price)}</TableCell>
                    <TableCell>{formatCurrency(asset.value)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className={isProfit ? "text-green-500" : "text-red-500"}>
                          {formatCurrency(profitLoss)}
                        </span>
                        <span className={`text-sm ${isProfit ? "text-green-500" : "text-red-500"}`}>
                          {profitLossPercentage.toFixed(2)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteAsset(asset.id)}
                      >
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Aucun actif dans ce wallet.
          <br />
          Cliquez sur "Ajouter un actif" pour commencer.
        </div>
      )}
    </div>
  );
}
