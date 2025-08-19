import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Button,
  Badge,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui';
import { 
  Bot,
  Plus,
  Edit,
  Trash2,
  MessageSquare
} from 'lucide-react';

const BotPersonalitiesTab = () => {
  // Sample data untuk Bot Personalities
  const botPersonalities = [
    { 
      id: 1, 
      name: 'Ramah & Profesional', 
      language: 'ID', 
      tone: 'Formal', 
      greetingMessage: 'Halo! Selamat datang di layanan kami. Ada yang bisa saya bantu?', 
      errorMessage: 'Maaf, saya tidak memahami permintaan Anda. Bisakah Anda menjelaskan lebih detail?' 
    },
    { 
      id: 2, 
      name: 'Casual & Friendly', 
      language: 'ID', 
      tone: 'Informal', 
      greetingMessage: 'Hai! Gimana kabarnya? Ada yang bisa dibantu?', 
      errorMessage: 'Waduh, saya kurang paham nih. Coba dijelasin lagi dong!' 
    },
  ];

  const [selectedPersonality, setSelectedPersonality] = useState(botPersonalities[0]);

  return (
    <div className="space-y-6">
      {/* Bot Personalities List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Bot Personalities
              </CardTitle>
              <CardDescription>Kelola bot_personalities untuk mengatur bahasa, tone, dan pesan sistem</CardDescription>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Personality
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Nama Personality</TableHead>
                  <TableHead className="min-w-[120px]">Bahasa</TableHead>
                  <TableHead className="min-w-[100px]">Tone</TableHead>
                  <TableHead className="min-w-[100px]">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {botPersonalities.map((personality) => (
                  <TableRow key={personality.id}>
                    <TableCell className="font-medium">{personality.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{personality.language}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{personality.tone}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedPersonality(personality)}
                          title="Edit Personality"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" title="Delete Personality">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* System Messages Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Pesan Sistem
          </CardTitle>
          <CardDescription>Konfigurasi greeting_message, error_message, dan pesan sistem lainnya</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-3">
            <Label htmlFor="personality-select">Pilih Personality</Label>
            <Select 
              value={selectedPersonality.id.toString()} 
              onValueChange={(value) => {
                const personality = botPersonalities.find(p => p.id.toString() === value);
                if (personality) setSelectedPersonality(personality);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {botPersonalities.map((personality) => (
                  <SelectItem key={personality.id} value={personality.id.toString()}>
                    {personality.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="greeting-message">Greeting Message</Label>
            <Textarea 
              id="greeting-message" 
              value={selectedPersonality.greetingMessage}
              rows={3}
              placeholder="Pesan sambutan untuk pengguna baru"
              readOnly
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="error-message">Error Message</Label>
            <Textarea 
              id="error-message" 
              value={selectedPersonality.errorMessage}
              rows={3}
              placeholder="Pesan ketika bot tidak memahami input pengguna"
              readOnly
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="language-select">Bahasa</Label>
              <Select value={selectedPersonality.language.toLowerCase()}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="tone-select">Tone</Label>
              <Select value={selectedPersonality.tone.toLowerCase()}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="informal">Informal</SelectItem>
                  <SelectItem value="friendly">Ramah</SelectItem>
                  <SelectItem value="professional">Profesional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline">
              Reset
            </Button>
            <Button>
              Simpan Perubahan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BotPersonalitiesTab;
