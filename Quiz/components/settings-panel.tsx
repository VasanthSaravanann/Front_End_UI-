"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
  language: string;
  onChangeLanguage: (language: 'en' | 'es' | 'fr') => void;
}

export function SettingsPanel({
  open,
  onClose,
  soundEnabled,
  onToggleSound,
  language,
  onChangeLanguage,
}: SettingsPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="sound">Sound Effects</Label>
            <Switch
              id="sound"
              checked={soundEnabled}
              onCheckedChange={onToggleSound}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={language} onValueChange={onChangeLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}