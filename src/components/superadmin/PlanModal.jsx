import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  Switch,
  Separator,
  Alert,
  AlertDescription
} from '../ui';
import { 
  Save,
  X,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Users,
  MessageSquare,
  Zap
} from 'lucide-react';

const PlanModal = ({ plan, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    tier: 'basic',
    priceMonthly: 0,
    priceYearly: 0,
    maxAgents: 1,
    maxMessagesPerMonth: 100,
    features: [],
    isActive: true,
    description: '',
    highlights: []
  });

  const [featureInput, setFeatureInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when plan changes
  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || '',
        tier: plan.tier || 'basic',
        priceMonthly: plan.priceMonthly || 0,
        priceYearly: plan.priceYearly || 0,
        maxAgents: plan.maxAgents || 1,
        maxMessagesPerMonth: plan.maxMessagesPerMonth || 100,
        features: plan.features || [],
        isActive: plan.isActive !== undefined ? plan.isActive : true,
        description: plan.description || '',
        highlights: plan.highlights || []
      });
    } else {
      // Reset form for new plan
      setFormData({
        name: '',
        tier: 'basic',
        priceMonthly: 0,
        priceYearly: 0,
        maxAgents: 1,
        maxMessagesPerMonth: 100,
        features: [],
        isActive: true,
        description: '',
        highlights: []
      });
    }
    setErrors({});
  }, [plan]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama paket wajib diisi';
    }

    if (formData.priceMonthly < 0) {
      newErrors.priceMonthly = 'Harga harus positif';
    }

    if (formData.maxAgents < 1) {
      newErrors.maxAgents = 'Minimal harus ada 1 agent';
    }

    if (formData.maxMessagesPerMonth < 1) {
      newErrors.maxMessagesPerMonth = 'Minimal harus ada 1 pesan per bulan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Calculate yearly price if not set
      const finalData = {
        ...formData,
        priceYearly: formData.priceYearly || Math.round(formData.priceMonthly * 10) // 10 bulan bayar untuk 12 bulan
      };

      await onSave(finalData);
      onClose();
    } catch (error) {
      console.error('Error saving plan:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addHighlight = () => {
    if (highlightInput.trim() && !formData.highlights.includes(highlightInput.trim())) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, highlightInput.trim()]
      }));
      setHighlightInput('');
    }
  };

  const removeHighlight = (index) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const getTierColor = (tier) => {
    const colors = {
      basic: 'bg-blue-100 text-blue-800 border-blue-200',
      professional: 'bg-purple-100 text-purple-800 border-purple-200',
      enterprise: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[tier] || colors.basic;
  };

  const getTierIcon = (tier) => {
    const icons = {
      basic: <Users className="w-4 h-4" />,
      professional: <Zap className="w-4 h-4" />,
      enterprise: <CheckCircle className="w-4 h-4" />
    };
    return icons[tier] || icons.basic;
  };

  if (!isOpen) return null;

  return (
    <Dialog>
      <DialogContent className="max-w-4xl max-h-[95vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getTierIcon(formData.tier)}
            <div>
              <DialogTitle>
                {plan ? 'Edit Paket Berlangganan' : 'Buat Paket Baru'}
              </DialogTitle>
              <DialogDescription>
                {plan 
                  ? 'Perbarui detail dan fitur paket berlangganan'
                  : 'Buat paket berlangganan baru untuk pelanggan Anda'
                }
              </DialogDescription>
            </div>
          </div>
          <DialogClose onClick={onClose} />
        </DialogHeader>

        <DialogBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Informasi Dasar
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Paket *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Starter, Business, Enterprise"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tier">Tier</Label>
                  <Select value={formData.tier} onValueChange={(value) => setFormData(prev => ({ ...prev, tier: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={getTierColor(formData.tier)}>
                      {formData.tier.charAt(0).toUpperCase() + formData.tier.slice(1)} Tier
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Jelaskan apa yang ditawarkan paket ini..."
                  rows={3}
                />
              </div>
            </div>

            <Separator />

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Harga
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceMonthly">Harga Bulanan (Rp) *</Label>
                  <Input
                    id="priceMonthly"
                    type="number"
                    value={formData.priceMonthly}
                    onChange={(e) => setFormData(prev => ({ ...prev, priceMonthly: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                    className={errors.priceMonthly ? 'border-destructive' : ''}
                  />
                  {errors.priceMonthly && <p className="text-sm text-destructive">{errors.priceMonthly}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priceYearly">Harga Tahunan (Rp)</Label>
                  <Input
                    id="priceYearly"
                    type="number"
                    value={formData.priceYearly}
                    onChange={(e) => setFormData(prev => ({ ...prev, priceYearly: parseInt(e.target.value) || 0 }))}
                    placeholder="Auto-calculated (20% discount)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Kosongkan untuk kalkulasi otomatis
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Limits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5" />
                Batasan Penggunaan
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxAgents">Maksimal Agent *</Label>
                  <Input
                    id="maxAgents"
                    type="number"
                    value={formData.maxAgents}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxAgents: parseInt(e.target.value) || 1 }))}
                    placeholder="1"
                    className={errors.maxAgents ? 'border-destructive' : ''}
                  />
                  {errors.maxAgents && <p className="text-sm text-destructive">{errors.maxAgents}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxMessages">Pesan per Bulan *</Label>
                  <Input
                    id="maxMessages"
                    type="number"
                    value={formData.maxMessagesPerMonth}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxMessagesPerMonth: parseInt(e.target.value) || 100 }))}
                    placeholder="1000"
                    className={errors.maxMessagesPerMonth ? 'border-destructive' : ''}
                  />
                  {errors.maxMessagesPerMonth && <p className="text-sm text-destructive">{errors.maxMessagesPerMonth}</p>}
                </div>
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Fitur
              </h3>
              
              <div className="space-y-2">
                <Label>Tambah Fitur</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Masukkan fitur (e.g., Live Chat, API Access)"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button type="button" onClick={addFeature} disabled={!featureInput.trim()}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {formData.features.length > 0 && (
                <div className="space-y-2">
                  <Label>Fitur Saat Ini</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeFeature(index)}
                      >
                        {feature} <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Highlights */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Sorotan Paket
              </h3>
              
              <div className="space-y-2">
                <Label>Tambah Sorotan</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Masukkan sorotan (e.g., Terpopuler, Nilai Terbaik)"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                  />
                  <Button type="button" onClick={addHighlight} disabled={!highlightInput.trim()}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {formData.highlights.length > 0 && (
                <div className="space-y-2">
                  <Label>Sorotan Saat Ini</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.highlights.map((highlight, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeHighlight(index)}
                      >
                        {highlight} <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Status Paket</h3>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="isActive">Paket Aktif</Label>
              </div>
              
              {!formData.isActive && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Paket ini akan disembunyikan dari pelanggan ketika tidak aktif.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </form>
        </DialogBody>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Menyimpan...' : (plan ? 'Update Paket' : 'Buat Paket')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanModal;
