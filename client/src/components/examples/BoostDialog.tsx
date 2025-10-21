import BoostDialog from '../BoostDialog';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export default function BoostDialogExample() {
  return (
    <div className="flex items-center justify-center p-12">
      <BoostDialog>
        <Button className="gap-2">
          <Zap className="h-4 w-4" />
          Booster ma mission
        </Button>
      </BoostDialog>
    </div>
  );
}
