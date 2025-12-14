import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const ENERGY_API = 'https://functions.poehali.dev/a0113d8f-a9b7-40ce-951c-c04f61976a1b';

interface EnergyBadgeProps {
  projectId?: string;
}

const EnergyBadge = ({ projectId = 'bath_calculator' }: EnergyBadgeProps) => {
  const [energy, setEnergy] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = 'demo_user_001';

  const fetchEnergy = async () => {
    try {
      const response = await fetch(`${ENERGY_API}?user_id=${userId}&project_id=${projectId}`);
      const data = await response.json();
      setEnergy(data.energy);
    } catch (error) {
      console.error('Failed to fetch energy:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnergy();
    const interval = setInterval(fetchEnergy, 30000);
    return () => clearInterval(interval);
  }, [projectId]);

  if (loading) {
    return (
      <div className="fixed top-4 right-4 bg-white shadow-lg rounded-full px-4 py-2 border-2 border-gray-200 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <span className="text-gray-400">...</span>
        </div>
      </div>
    );
  }

  const getEnergyColor = () => {
    if (!energy) return 'text-gray-500';
    if (energy > 50) return 'text-green-600';
    if (energy > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEnergyIcon = () => {
    if (!energy) return 'Battery';
    if (energy > 50) return 'BatteryFull';
    if (energy > 20) return 'BatteryMedium';
    return 'BatteryLow';
  };

  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg rounded-full px-5 py-3 border-2 border-yellow-400 z-50">
      <div className="flex items-center gap-3">
        <Icon name={getEnergyIcon()} className={getEnergyColor()} size={24} />
        <div className="flex flex-col">
          <span className={`text-xl font-bold ${getEnergyColor()}`}>
            {energy ?? 0}
          </span>
          <span className="text-xs text-gray-500">энергии</span>
        </div>
      </div>
    </div>
  );
};

export default EnergyBadge;